var Promise = require('bluebird'),
    request = Promise.promisify(require('request')),
    statusCodes = require('http').STATUS_CODES,
    _ = require('lodash'),
    chalk = require('chalk'),
    jUnitReportGenerator = require('./jUnitReportGenerator');

function ExternalLinkTester(opts) {
    this.timeout = 3000;

    this.headers = {
        // Some websites send 429 status code if this header is missing.
        'User-Agent': 'request'
    };

    this.externalLinks = opts.externalLinks;
    this.outputFile = opts.outputFile;

    return this;
}

ExternalLinkTester.prototype.linkIsNotOk = function (opts) {
    var linkIsNotOkMsg = ' Link ' + opts.url + ' is not ok.';
    if(opts.statusCode) {
        linkIsNotOkMsg += ' Status code was ' + opts.statusCode + ' ' + statusCodes[opts.statusCode +''];
    } else if(opts.errorCode) {
        linkIsNotOkMsg += ' Error code was ' + opts.errorCode;
    }
    console.log(chalk.red('✘ ERROR: ') + linkIsNotOkMsg);
    opts.testCase.success = false;
    opts.testCase.error = linkIsNotOkMsg;
    return this;
};

ExternalLinkTester.prototype.linkIsOk = function (opts) {
    var linkIsOkMsg = ' Link ' + opts.url + ' is ok.';
    opts.testCase.success = true;
    console.log(chalk.green('✔ SUCCESS: ') + linkIsOkMsg);
    return this;
};

ExternalLinkTester.prototype.testLink = function (opts) {
    var self = this,
        testCaseResult = {
            name: opts.url,
            time: 0
        };

    return request({
        url: opts.url,
        headers: self.headers
    }).then(function(contents){
        // Website is up
        if (contents.statusCode === 200) {
            self.linkIsOk({url: opts.url, testCase: testCaseResult});
        } else {
            self.linkIsNotOk({url: opts.url, statusCode: contents.statusCode, testCase: testCaseResult});
        }
    }).catch(function(e) {
        self.linkIsNotOk({url: opts.url, errorCode: e.code, testCase: testCaseResult});
    }).finally(function() {
        _addTestCaseToTestSuite({
            testSuite: opts.testSuite,
            testCase: testCaseResult
        })
    });
};

function _addTestCaseToTestSuite(opts) {
    opts.testSuite.testCases.push(opts.testCase);
    if(!opts.testCase.success) {
        opts.testSuite.numberOfErrors += 1;
        opts.testSuite.numberOfFailures = opts.testSuite.numberOfErrors;
    }
}

ExternalLinkTester.prototype.testLinks = function () {
    var self = this,
        testSuite = {
            numberOfTests: self.externalLinks.length,
            numberOfErrors: 0,
            numberOfFailures: 0,
            time: 0,
            testCases: []
        },
        tests = [];

    _.forEach(self.externalLinks, function(externalLink) {
        tests.push(self.testLink({
            url: externalLink.url,
            testSuite: testSuite
        }));
    });

    Promise.all(tests).then(function() {
        console.log('All ' + testSuite.numberOfTests + ' tests finished running.');
        console.log('There were ' + testSuite.numberOfFailures + ' failed tests.');

        if(self.outputFile) {
            console.log('Generating JUnit report...');
            jUnitReportGenerator.generateTestsReport({
                outputFile: self.outputFile,
                suiteName: 'External link tester',
                numberOfTests: testSuite.numberOfTests,
                numberOfErrors: testSuite.numberOfErrors,
                numberOfFailures: testSuite.numberOfFailures,
                time: testSuite.time,
                testCases: testSuite.testCases

            })
        }
    });
};

module.exports = ExternalLinkTester;
