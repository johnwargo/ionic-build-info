# Ionic Build Info

While building a desktop web application using the [Ionic Framework](https://ionicframework.com/), I realized that for support purposes I wanted the ability to display the app's build number (or even build date) in the application somewhere. I started looking for a solution and didn't find one, so I built this module.

## Installation

Install the module by opening a terminal window and executing the following command:

```shell
npm install g ionic-build-info
```

This installs the module at global scope, so its available anywhere. If you have a problem and read somewhere that you should use the `sudo` command along with the command shown above, you're getting bad advice, there's no reason to install npm modules using `sudo`.

## Operation

When you execute the module, it reads the local Ionic project's `package.json` file, and, using the file's `version` property and the current date/time, creates a new file in the project at `src/app/buildinfo.ts` containing the following information:

```typescript
export const buildInfo = {
  buildVersion: "0.0.4",
  buildDate: 1611670976033
}
```

To import the generated module in a page script, use the following:

```typescript
import { buildInfo } from '../buildinfo';
```

When you import this file into your IOnic project, the app has access to the project's build details. Here's an example of how to use the generated module in your app, the following code is from a simple page that outputs the build information to the browser's console:

```typescript
export class HomePage {

  appBuildNumber: string = '';
  appBuildDate: Date;

  constructor() {
    this.appBuildNumber = buildInfo.buildVersion;
    this.appBuildDate = new Date(buildInfo.buildDate);

    console.log(`Build Number: ${this.appBuildNumber}`);
    console.log(`Build Date: ${this.appBuildDate}`);
  }
 
}
```

To use the values in a page's content, use something like the following:

```html
<p>Build: {{this.appBuildNumber}} [{{this.appBuildDate}}]</p>
```

## Usage

You can use the module from the command line or include it in your Ionic project's build process.

To generate an update to the project's `buildinfo.ts` file, open a terminal window, navigate to an Ionic project, and execute the following command:

```shell
ionic-build-info
```

To add this process, open your Ionic project's `package.json` file and update the existing `build` script entry from:

```text
"build": "ng build ",
```

to:

```text
"build": "npm version patch && ionic-build-info && ng build ",
```

The `npm version patch` part of the build step increments the patch version in the `package.json` file before calling `ionic-build-info`.
