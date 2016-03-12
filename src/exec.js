/*jslint node: true */
/*jshint esversion: 6 */
/* jshint -W097 */
'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    commandBuilder = require('./CommandBuilder.js'),
    spawn = require('child-process-promise').spawn,
    Q = require('q');

var processError = function(err, cb){
  if(cb && _.isFunction(cb) && err){
    cb(err)
  }
  else if(err){
    throw err.message;
  }
}

var processConsole = function processConsole(childProcess) {
  if(childProcess && childProcess.stdout){
    childProcess.stdout.on('data', (data)=>console.log(data.toString()));
  }
  if(childProcess && childProcess.stderr){
    childProcess.stderr.on('data', (data)=>console.log(data.toString()));
  }

};

var main = function (options, callback) {
  var commands = commandBuilder(options);
  var heat = null;
  console.log(commands);
  //todo redo this a little...
  if(commands.heatCommands){
    console.log(commands.heatPath, commands.heatCommands);
    heat = spawn(commands.heatPath, commands.heatCommands)
    .progress(processConsole);
  }
  heat = heat || Q.Promise();

  return  Q.all([heat])
    .then(()=>spawn(commands.candlePath, commands.candleCommands), (err)=>processError(err, callback))
    .progress(processConsole)
    .then(()=>spawn(commands.lightPath, commands.lightCommands), (err)=>processError(err, callback))
    .progress(processConsole)
    .fail((err)=>processError(err, callback));
};

module.exports = main;
