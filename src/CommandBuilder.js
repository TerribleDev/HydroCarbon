'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    path = require('path');


var calculateCommands =  function(options){
  var commands = {
    heatPath: options.heatPath || __dirname + "/wixFiles/heat.exe",
    lightPath: options.lightPath || __dirname + "/wixFiles/light.exe",
    candlePath: options.candlePath || __dirname + "/wixFiles/candle.exe"
  }
  if(options.version){
    process.env.BUILD_VERSION = version;
  }
  if(options.heatCommands && _.isArray(options.heatCommands)){
    commands.heatCommands = options.heatCommands
  }
  else{
    if(options.heatFiles && _.isArray(options.heatFiles) && options.heatFiles.length >  0 ){
        commands.heatCommands = _.map(options.heatFiles, (file)=>`@${path.normalize(file)}`) //heat commands can be empty as heat is a harvester and thus optional
      }
  }

  if(options.candleCommands && _.isArray(options.candleCommands)){
    commands.candleCommands = options.candleCommands
  }
  else{
    if(!options.candleFiles || !_.isArray(options.candleFiles) || options.candleFiles.length < 1 ){
        throw "light files are required if light commands are not specified";
    }
    commands.candleCommands = _.map(options.candleFiles, (file)=>`@${path.normalize(file)}`)
  }

  if(options.lightCommands && _.isArray(options.lightCommands)){
    commands.lightCommands = options.lightCommands
  }
  else{
    if(!options.lightFiles || !_.isArray(options.lightFiles) || options.lightFiles.length < 1 ){
        throw "light files are required if light commands are not specified";
    }
    commands.lightCommands = _.map(options.lightFiles, (file)=>`@${path.normalize(file)}`)
  }
  return commands;
};

module.exports = calculateCommands;
