'use strict'

module.exports = function processConsole(childProcess) {
  if(childProcess && childProcess.stdout){
    childProcess.stdout.on('data', (data)=>console.log(data.toString()));
  }
  if(childProcess && childProcess.stderr){
    childProcess.stderr.on('data', (data)=>console.log(data.toString()));
  }

};
