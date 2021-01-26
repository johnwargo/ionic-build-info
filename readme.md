# Ionic Build Info

I wanted a way to display an Ionic app's build number and build timestamp within the app.

Install the module by opening a terminal window, navigating to the Ionic project's root, and executing the following command:

```shell
npm install g ionic-build-info
```

When  you execute the module, it generates the following file in the Ionic project's `src/app/buildinfo.ts` file.

```typescript
export const buildInfo = {
  buildVersion: "0.0.1",
  buildDate: "Tue Jan 26 2021 06:38:57 GMT-0500 (GMT-05:00)"
}
```

Then, within your app, you can import the module and access the Properties of the object.

Update the project's `package.json` file, will work out the specifics of this once I test it

```text
"build": "npm version patch && ionic-build-info && ng build ",
```

> *Note:* This module was only tested on Windows (will check on macOS when I get a chance);
