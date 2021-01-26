"use strict";
var boxen = require('boxen');
var chalk = require('chalk');
var fs = require('fs').promises;
// const fs = require('fs');
var path = require('path');
// https://stackoverflow.com/questions/9153571/is-there-a-way-to-get-version-from-package-json-in-nodejs-code
var packageDotJSON = require('./package.json');
var appName = 'Ionic Build Info';
var buildVersion = packageDotJSON.version;
var blankStr = '';
var buildDate = new Date(Date.now());
var outputFile = path.join(process.cwd(), 'src/app/buildinfo.ts');
// Opening window
console.log(boxen(appName, { padding: 1 }));
console.log("Output file: " + outputFile);
console.log("Build version: " + buildVersion);
console.log("Build date: " + buildDate.toString());
var outputStr = 'export const buildInfo = {\n';
outputStr += "  buildVersion: \"" + buildVersion + "\",\n";
outputStr += "  buildDate: \"" + buildDate + "\"\n";
outputStr += '}';
console.log(outputStr);
fs.writeFile(outputFile, outputStr, function (err, data) {
    if (err) {
        console.log(chalk.red('Error: Unable to write to file'));
        console.log(err);
    }
    console.log(data);
});
