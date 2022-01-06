# Ionic Build Info

While building a desktop web application using the [Ionic Framework](https://ionicframework.com/), I realized that for support purposes I wanted the ability to display the app's build number (or even build date) in the application somewhere. I started looking for a solution and didn't find one, so I built this module.

## Installation

Install the module by opening a terminal window and executing the following command:

```shell
npm install --save-dev ionic-build-info
```

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

When you import this file into your Ionic project, the app has access to the project's build details. Here's an example of how to use the generated module in your app, the following code is from a simple page that outputs the build information to the browser's console:

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

Open the project's `package.json` file and add this process to the existing `build` script entry, changing:

```text
"build": "ng build ",
```

to:

```text
"build": "npm version patch && ionic-build-info && ng build ",
```

The `npm version patch` part of the build step increments the patch version in the `package.json` file before calling `ionic-build-info`.

With this in place, when you execute `ionic build` to build a production version of the app, `npm` will update the version number in the project's `package.json` file, build an updated version of the buildinfo.js file, then generate the production build of the app.

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com). Learn about all of my publications at [John Wargo Books](http://www.johnwargobooks.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
