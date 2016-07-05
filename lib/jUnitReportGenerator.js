var builder = require('xmlbuilder'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    mkdirp = require('mkdirp');

var _generateJunitTestReportXml = function (opts) {
    var xml = builder.create('testsuites');
    var timestamp = (new Date()).toISOString().substr(0, 19);
    var suite = xml.ele('testsuite', {
        name: opts.suiteName, timestamp: timestamp, id: 0
    });

    suite.att('tests', opts.numberOfTests);
    suite.att('errors', opts.numberOfErrors);
    suite.att('failures', opts.numberOfFailures);
    suite.att('time', opts.time);

    _.forEach(opts.testCases, function(testCase) {
        var spec = suite.ele('testcase', {
            name: testCase.name,
            time: testCase.time
        });

        if(testCase.skipped) {
            spec.ele('skipped');
        }

        if(!testCase.success) {
            spec.ele('failure', {type: ''}, testCase.error);
        }
    });

    return xml;
};

var generateTestsReport = function (opts) {
    var xml = _generateJunitTestReportXml(opts);
    mkdirp(path.dirname(opts.outputFile), function(err) {
        fs.writeFile(opts.outputFile, xml.end({pretty: true}), function(err) {
            if (err) {
                console.log('Cannot write JUnit xml\n\t' + err.message);
            } else {
                console.log('JUnit results written to "%s".', opts.outputFile);
            }
        });
    });
};

module.exports = {
    generateTestsReport: generateTestsReport
};

