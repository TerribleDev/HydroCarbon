/*jslint node: true */
/*jshint esversion: 6 */
/* jshint -W097 */
'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    commandBuilder = require('./CommandBuilder.js'),
    spawn = require('child-process-promise').spawn;

var processResults = function (stdout) {
    if(stdout && _.isArray(stdout)){
      _.chain(stdout)
      .filter((item)=>item && item.length > 0)
      .each((item)=>console.log(item))
      .value();
    }
    else if(stdout && _.isString(stdout) && stdout.length > 0){
      console.log(stdout);
    }

};

var processError = function(err, cb){
  console.log(err);
  if(cb && _.isFunction(cb) && err){
    cb(err)
  }
  else if(err){
    throw err
  }
}

var processConsole = function processConsole(childProcess) {
  if(childProcess && childProcess.stdout){
    childProcess.stdout.on('data', (data)=>processResults(data.toString()));
  }
  if(childProcess && childProcess.stderr){
    childProcess.stderr.on('data', (data)=>processResults(data.toString()));
  }

};

var main = function (options, callback) {
  var commands = commandBuilder(options);
  //todo redo this a little...
  if(commands.heatCommands){
    return spawn(commands.heatPath, commands.heatCommands)
    .progress(processConsole)
    .then(()=>spawn(commands.candlePath, commands.candleCommands))
    .progress(processConsole)
    .then(()=>spawn(commands.lightPath, commands.lightCommands))
    .progress(processConsole)
    .then(()=>{
      if(callback && _.isFunction(callback)){
        callback();
      }
    });
  }
  return spawn(commands.candlePath, commands.candleCommands)
        .progress(processConsole)
        .then(()=>spawn(commands.lightPath, commands.lightCommands))
        .progress(processConsole)
        .then(()=>{
          if(callback && _.isFunction(callback)){
            callback();
          }
        });
};

module.exports = main;
