/*jslint node: true */
/*jshint esversion: 6 */
/* jshint -W097 */
'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    child_process = require('child_process');

var processResults = function (stdout, stderr) {
    if(stdout && _.isArray(stdout)){
      _.chain(stdout)
      .filter((item)=>item && item.length > 0)
      .each((item)=>console.log(item))
      .value();
    }
    else if(stdout && _.isString(stdout) && stdout.length > 0){
      console.log(stdout);
    }
    if(stderr && _.isString(stderr) && stderr.length > 0){
      console.log(stderr);
    }

};
var main = function (options, callback) {
    var heatFiles = options.heatFiles;
    var candleFiles = options.candleFiles;
    var lightFiles = options.lightFiles;
    var heatCommands = options.heatCommands || null;
    var candleCommands = options.candleCommands || null;
    var lightCommands = options.lightCommands || null;
    var heatPath = options.heatPath || __dirname + "/wixFiles/heat.exe";
    var lightPath = options.lightPath || __dirname + "/wixFiles/light.exe";
    var candlePath = options.candlePath || __dirname + "/wixFiles/candle.exe";
    var cb = callback;
    var version = options.version;
    if(version){
      process.env.BUILD_VERSION = version;
    }
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

    return child_process.execFile(path.normalize(heatPath), heatCommands? heatCommands: _.map(heatFiles, (file)=>`@${path.normalize(file)}`), (err, stdout, stderr)=>{
      processResults(stdout, stderr);
      if(err){
        if(cb){
          return cb(err);
        }else{
          throw err;
        }

      }

          return child_process.execFile(path.normalize(candlePath), candleCommands? candleCommands: _.map(candleFiles, (file)=>`@${path.normalize(file)}`), (err, stdout, stderr)=>{
            processResults(stdout, stderr);
            if(err){
              if(cb){
                return cb(err);
              }else{
                throw err;
              }

            }

              return child_process.execFile(path.normalize(lightPath), lightCommands? lightCommands: _.map(lightFiles, (file)=>`@${path.normalize(file)}`), (err, stdout, stderr)=>{
                processResults(stdout, stderr);
                if(err){
                  if(cb){
                    return cb(err);
                  }else{
                    throw err;
                  }

                }
                if(cb){
                  return cb();
                }

              });

        });

    });
};

var checkFiles = function(files){
    _.each(files, (file)=>{
        if(!checkFile(file)){
            throw "error finding file" + file;
        }
    });
};
var checkFile = function (file) {
    if (!file || file.length < 1) {
        return false;
    }
    try {
        fs.accessSync(path.normalize(file), fs.R_OK); //will error if doesnt exist
        //todo async?
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = main;
