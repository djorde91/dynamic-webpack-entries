const helpers = require('./helpers/helpers.js');

/**
 * 
 * Returns an object using a map of key:value for webpack entry points
 * @param {Object} settings
 * @returns {Object}
 */
function getEntryFiles(settings){
  folder = (settings.entryFolder) ? settings.entryFolder : `${process.cwd()}/src/entry-points`;
  pattern = (settings.include) ? settings.include : '/**/*.*';

  var files = helpers.getFiles(folder + pattern, settings.options);
  var filesMap = getEntriesMap(files)

  if(settings.logEntries) console.log(filesMap)
  
  return filesMap;
}

/**
 * 
 * Sets a map of key:value based on files path and name
 * @param {Object} files
 * @returns {Object}
 */
function getEntriesMap(files){
  var entriesMap = new Map();

  files.forEach(file => {
    let entryName = file.substring(0, file.lastIndexOf("."));
    entryName = entryName.split(folder).pop();
    
    entriesMap.set(entryName, file)

  });

  return Object.fromEntries(entriesMap);
}

module.exports.getEntryFiles = getEntryFiles;