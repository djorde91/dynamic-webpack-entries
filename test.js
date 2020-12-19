const { web } = require("webpack");
const entryPoints = require("./index.js");

return entryPoints({
        entryFolder: `${process.cwd()}/src/testing/entry-points`,
        include: '/**/*.{css,scss,js}',
        logEntries: true,
    }
)

//  {
//      entryFolder:,                   // default: `${process.cwd()}/src/entry-points`
//      include: ,                      // default: `'/**/*.*';`
//      logResult:                      // default: false             
//      options: {                      // https://www.npmjs.com/package/glob#options
//
//      }
//  }