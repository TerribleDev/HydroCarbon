/*jslint node: true */
/*jshint esversion: 6 */
/* jshint -W097 */
'use strict';
var fs = require('fs'),
    when = require('when'),
    _ = require('underscore'),
    path = require('path'),
    child_process = require('child_process');
var main = function (options) {
    var heatFiles = options.heatFiles;
    var candleFiles = options.candleFiles;
    var lightFiles = options.lightFiles;
    var heatCommands = options.heatCommands || null;
    var candleCommands = options.candleCommands || null;
    var lightCommands = options.lightCommands || null;
    var heatPath = options.heatPath || path.normalize(__dirname + "/heat.exe");
    var lightPath = options.lightPath || path.normalize(__dirname + "/light.exe");
    var candlePath = options.candlePath || path.normalize(__dirname + "/candle.exe");
    if(!heatCommands){
            if(!heatFiles || !_.isArray(heatFiles) || heatFiles.length < 1 ){
            throw "heat files are required if no commands are passed";
        }
         checkFiles(heatFiles);
    }

    if(!candleCommands){

      if(!candleFiles || !_.isArray(candleFiles) || candleFiles.length < 1 ){
          throw "candle files are required";
      }

      checkFiles(candleCommands);

    }

    if(!lightCommands){

      if(!lightFiles || !_.isArray(lightFiles) || lightFiles.length < 1 ){
          throw "light files are required";
      }

      checkFiles(lightFiles);

    }
    child_process.execFileSync(heatPath, heatCommands? heatCommands: _.map(heatFiles, (file)=>`@${path.normalize(file)}`));
};
var checkFiles = function(files){
    _.each(files, (file)=>{
        if(!checkFile(file)){
            throw "error finding file" + file;
        }
    });
};
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
};
