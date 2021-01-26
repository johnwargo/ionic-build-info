const boxen = require('boxen');
const chalk = require('chalk');
const fs = require('fs').promises;
// const fs = require('fs');
const path = require('path');
// https://stackoverflow.com/questions/9153571/is-there-a-way-to-get-version-from-package-json-in-nodejs-code
const packageDotJSON = require('./package.json');

const appName = 'Ionic Build Info';
const buildVersion = packageDotJSON.version;
const blankStr = '';
const buildDate = new Date(Date.now());
const outputFile = path.join(process.cwd(), 'src/app/buildinfo.ts');


// Opening window
console.log(boxen(appName, { padding: 1 }));
console.log(`Output file: ${outputFile}`);
console.log(`Build version: ${buildVersion}`);
console.log(`Build date: ${buildDate.toString()}`);

let outputStr = 'export const buildInfo = {\n';
outputStr += `  buildVersion: "${buildVersion}",\n`;
outputStr += `  buildDate: "${buildDate}"\n`;
outputStr += '}';

console.log(outputStr);

fs.writeFile(outputFile, outputStr, function (err: any, data: any) {
    if (err) {
        console.log(chalk.red('Error: Unable to write to file'));
        console.log(err);
    }
    console.log(data);
});