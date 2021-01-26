#!/usr/bin/env node
"use strict";
var boxen = require('boxen');
var chalk = require('chalk');
// const fs = require('fs').promises;
var fs = require('fs');
var path = require('path');
// https://stackoverflow.com/questions/9153571/is-there-a-way-to-get-version-from-package-json-in-nodejs-code
var packageDotJSON = require('./package.json');
var appName = 'Ionic Build Info';
var buildVersion = packageDotJSON.version;
var blankStr = '';
var buildDate = new Date(Date.now());
var outputFolder = path.join(process.cwd(), 'src/app');
var outputFile = path.join(outputFolder, 'buildinfo.ts');
function displayHighlight(highlight, msg) {
    console.log(chalk.yellow(highlight + ": ") + msg);
}
// Opening window
console.log(boxen(appName, { padding: 1 }));
displayHighlight('Output folder', outputFolder);
displayHighlight('Output file', outputFile);
displayHighlight('Build version', buildVersion);
displayHighlight('Build date', buildDate.toString());
try {
    if (!fs.existsSync(outputFolder)) {
        console.log(chalk.red('\nError: Output folder does not exist\n'));
        process.exit(1);
    }
}
catch (err) {
    console.error(err);
}
var outputStr = 'export const buildInfo = {\n';
outputStr += "  buildVersion: \"" + buildVersion + "\",\n";
outputStr += "  buildDate: \"" + buildDate + "\"\n";
outputStr += '}';
// console.log(outputStr);
console.log('\nWriting output file');
fs.writeFile(outputFile, outputStr, function (err, data) {
    if (err) {
        console.log(chalk.red('\nError: Unable to write to file\n'));
        console.log(err);
    }
    if (data) {
        console.log(data);
    }
});
