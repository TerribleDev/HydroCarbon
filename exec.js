var fs = require('fs'),
    when = require('when'),
    _ = require('underscore');
var main = function (options) {
    var heatFiles = options.heatFiles;
    var candleFiles = options.candleFiles;
    var lightFiles = options.lightFiles;
    var heatCommands = options.heatCommands || null;
    var candleCommands = options.candleCommands || null;
    var lightCommands = options.lightCommands || null;
    if(!heatCommands){
            if(!heatFiles || !_.isArray(heatFiles) || heatFiles.length < 1 ){
            throw "heat files are required if no commands are passed";
        }
         checkFiles(heatFiles);
    }
    
    if(!candleFiles || !_.isArray(candleFiles) || candleFiles.length < 1 ){
        throw "candle files are required"
    }
    if(!lightFiles || !_.isArray(lightFiles) || lightFiles.length < 1 ){
        throw "light files are required"
    }
  
    checkFiles(candleFiles);
    checkFiles(lightFiles); 
}
var checkFiles = function(files){
    _.each(files, (file)=>{
        if(!checkFile(file)){
            throw "error finding file" + file;
        }
    });
}
var checkFile = function (file) {
    if (file || file.length < 1) {
        return false;
    }
    try {
        fs.access(file, fs.R_OK); //will error if doesnt exist
        //todo async?
        return true;
    } catch (error) {
        return false;
    }
}