#!/usr/bin/env node

var ExternalLinksTester = require('./lib/externalLinksTester'),
    _ = require('lodash'),
    chalk = require('chalk');

var pathToConfigFile = process.argv[2];

if(_.isUndefined(pathToConfigFile)) {
    console.error(chalk.red('You need to provide the name of the config file (e.g. node app.js extLinksTester.config'));

    // Exit process with failure
    process.exit(1);
}

config = require(__dirname + '/' + pathToConfigFile);
new ExternalLinksTester({
    externalLinks: config.externalLinks,
    outputFile: config.outputFile
}).testLinks();


