//Node.js requires
const path = require('path');

//Custom requires
const webpackDynamicEntries = require("./index.js");

// Webpack requires

// Config variables

const entryPoints = webpackDynamicEntries({
    entryFolder: `${process.cwd()}/src/testing/entry-points`,
    include: '/**/*.{css,scss,js}',
    logEntries: true,
});
module.exports = (env, args) => {
    console.log('\x1b[33m%s\x1b[0m',`Webpack running on mode: ${args.mode} `);
    
    return {
        devtool: (args.mode == "development") ? "source-map" : false,
        watch: (args.watch) ? true: false,
        entry: entryPoints,
    };
};