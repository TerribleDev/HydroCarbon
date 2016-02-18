/*jslint node: true */
/*jshint esversion: 6 */
/* jshint -W097 */
'use strict';
var fs = require('fs'),
    when = require('when'),
    nodefn = require('when/node'),
    _ = require('underscore'),
    path = require('path'),
    child_process = require('child_process');
var logger = function(log){
  if(log){
    console.log(log);
  }
}
var main = function (options) {
    var heatFiles = options.heatFiles;
    var candleFiles = options.candleFiles;
    var lightFiles = options.lightFiles;
    var heatCommands = options.heatCommands || null;
    var candleCommands = options.candleCommands || null;
    var lightCommands = options.lightCommands || null;
    var heatPath = options.heatPath || __dirname + "/wixFiles/heat.exe";
    var lightPath = options.lightPath || __dirname + "/wixFiles/light.exe";
    var candlePath = options.candlePath || __dirname + "/wixFiles/candle.exe";
    var cb = options.callback || function(){};
    var version = options.version;
    if(version){
      process.env.BUILD_VERSION = version;
    }
    if(!heatCommands){
            if(!heatFiles || !_.isArray(heatFiles) || heatFiles.length < 1 ){
            throw "heat files are required if no commands are passed";
        }
      //   checkFiles(heatFiles);
    }

    if(!candleCommands){

      if(!candleFiles || !_.isArray(candleFiles) || candleFiles.length < 1 ){
          throw "candle files are required";
      }

      //checkFiles(candleCommands);

    }

    if(!lightCommands){

      if(!lightFiles || !_.isArray(lightFiles) || lightFiles.length < 1 ){
          throw "light files are required";
      }

      //checkFiles(lightFiles);

    }
    child_process.execFile(path.normalize(heatPath), heatCommands? heatCommands: _.map(heatFiles, (file)=>`@${path.normalize(file)}`), (err, stdout, stderr)=>{
      logger(stdout);
      logger(stderr);
      if(err){
        throw err;
      }

      child_process.execFile(path.normalize(candlePath), candleCommands? candleCommands: _.map(candleFiles, (file)=>`@${path.normalize(file)}`), (err, stdout, stderr)=>{
        logger(stdout);
        logger(stderr);
        if(err){
          throw err;
        }

        child_process.execFile(path.normalize(lightPath), lightCommands? lightCommands: _.map(lightFiles, (file)=>`@${path.normalize(file)}`), (err, stdout, stderr)=>{
          logger(stdout);
          logger(stderr);
          if(err){
            throw err;
          }

        });

      });

    });
    //todo: figure out how to use promises while capturing stderr on the catch
    /*
    var liftedChild = nodefn.lift(child_process.execFile);
    liftedChild(heatPath, heatCommands? heatCommands: _.map(heatFiles, (file)=>`@${path.normalize(file)}`))
    .then((stdin, stderror)=>{
      console.log(stdin);
      console.log(stderror);
      return liftedChild(candlePath, candleCommands? candleCommands: _.map(candleFiles, (file)=>`@${path.normalize(file)}`));
    })

    .then((stdin, stderror)=>{
      console.log(stdin);
      console.log(stderror);
      return liftedChild(lightPath, lightCommands? lightCommands: _.map(lightFiles, (file)=>`@${path.normalize(file)}`));
    })
    .catch((a,b,c)=>{
      console.log(a);
      console.log(b);
      console.log(c);
    })*/
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
        fs.access(path.normalize(file), fs.R_OK); //will error if doesnt exist
        //todo async?
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = main;
