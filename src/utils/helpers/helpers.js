const glob = require("glob");

/**
 * 
 * @param {string} pattern
 * @param {object} options
 */
var getFiles = function(pattern, options) {
    return glob.sync(pattern, options);
};

module.exports.getFiles = getFiles;