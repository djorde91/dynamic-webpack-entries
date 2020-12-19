const buildUtils = require('./src/utils/utils');

module.exports = function webpackDynamicEntries(settings) {
    return buildUtils.getEntryFiles(settings)
}