var ExternalLinksTester = require('./lib/externalLinksTester'),
    _ = require('lodash'),
    chalk = require('chalk');

var pathToConfigFile = process.argv[2];

if(_.isUndefined(pathToConfigFile)) {
    console.log(chalk.red('You need to provide a path to the config file (e.g. node app.js ../../extLinksTester.config'));

    // Exit process with failure
    process.exit(1);
}

config = require(pathToConfigFile);
var externalLinksTester = new ExternalLinksTester({
    externalLinks: config.externalLinks,
    outputFile: config.outputFile
}).testLinks();


