# dynamic-webpack-entries

The purpose of this package is to handle multiple entry-points on your [webpack][webpack] configuration using [glob] to handle the file matching. 

## Table of Contents
  1. [Introduction](#introduction)
  2. [Install](#install)
  3. [Usage](#usage)
  4. [Options](#options)

## Introduction

By default, [webpack entry points][webpack-entry-points] system is kind of static. This package let's you enhance webpack entry system and handle a whole lot of entry files without having to add them on your webpack configuration.

This is really useful on multi-page applications and multisite proyects where there are hundreds of files to handle.

## Install

Install with npm:

```bash
npm install --save-dev dynamic-webpack-entries
```

## Usage
Here are some basic usage examples, taking into account the following folder structure
```
📦src
 ┗ 📂entry-points
 ┃ ┣ 📂siteA
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┗ 📜header.js
 ┃ ┃ ┗ 📜main.js
 ┃ ┣ 📂siteB
 ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📂footer-parts
 ┃ ┃ ┃ ┃ ┗ 📜parts.js
 ┃ ┃ ┃ ┗ 📜footer.js
 ┃ ┃ ┗ 📜siteB.js
 ┃ ┣ 📂siteC
 ┃ ┃ ┗ 📂nested
 ┃ ┃ ┃ ┗ 📂folder
 ┃ ┃ ┃ ┃ ┗ 📜nested-file.js
 ┃ ┗ 📜globals.js

```

### Basic examples
Most basic configuration. With default options.

```javascript
const dynamicEntryPoints = require("dynamic-webpack-entries");

const entries = dynamicEntryPoints({
    entryFolder: `./src/entry-points`,
});

module.exports = {
    entry: entries,
    output: {
      filename: '[name].js' //Our output can be custom. This is the one webpack uses by default.
    }
};

//webpack output folder by default is "dist"

```
A more customizable example where using **glob** we can include and ignore specific files or folders.  
Check the options allowed by glob on their [documentation][glob-options]
```javascript
const dynamicEntryPoints = require("dynamic-webpack-entries");

const entries = dynamicEntryPoints({
    entryFolder: `./src/entry-points`,
    include: '/**/*.{css,scss,js}',                   
    logEntries: true,                   
      options: { //glob options
        ignore: ['/**/globals.js']
        debug: true,
        ....
      }
});

module.exports = {
    entry: entries,
    output: {
      filename: '[name].js' 
    }
};

```
**dynamicEntryPoints** function returns and object based on our file and folder structure. We can manipulate it if we want before passing it into webpack entry property.
```javascript
//Based on our example structure and including all files.
{
  '/globals': './src/entry-points/globals.js',
  '/siteA/header/header': './src/entry-points/siteA/header/header.js',
  '/siteA/main': './src/entry-points/siteA/main.js',
  '/siteB/footer/footer-parts/parts': './src/entry-points/siteB/footer/footer-parts/parts.js',
  '/siteB/footer/footer': './src/entry-points/siteB/footer/footer.js',
  '/siteB/siteB': './src/entry-points/siteB/siteB.js',
  '/siteC/nested/folder/nested-file': './src/entry-points/siteC/nested/folder/nested-file.js'
}
```
## Options

* `entryFolder` Directory in which to start looking for files.  *Defaults* to  `${process.cwd()}/src/entry-points`; 
* `logEntries` console.logs our entries on the CLI when compiling with webpack. Pretty useful when debugging and trying combinations with include and ignore options. *Defaults* to `false`; 
* `include` Expects a glob pattern for including files as our entry points. *Defaults* to `'/**/*.*'`
* `options` This propety matches the ones used by glob. **[Documented on their package.][glob-options]**

[webpack]: https://webpack.js.org/
[webpack-entry-points]: https://webpack.js.org/concepts/entry-points/
[glob]: https://www.npmjs.com/package/glob
[glob-options]: https://www.npmjs.com/package/glob#options
