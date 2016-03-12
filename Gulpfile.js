var gulp = require('gulp');
var unzip = require('gulp-unzip');
var request = require('request');
var fs = require('fs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta')
var exec = require('child_process').execSync;
var hydroexec = require('./lib/exec.js');
require('babel-core/register');

gulp.task('download', function () {
  return request('http://wixtoolset.org/downloads/v3.11.0.129/wix311-binaries.zip').pipe(fs.createWriteStream('wixToolset.zip'));
});

gulp.task('getwix',['download'], function(){
  return gulp.src("wixToolset.zip")
   .pipe(unzip())
   .pipe(gulp.dest('./lib/wixFiles'));
});
//todo use gulp-istanbul and gulp-mocha
gulp.task('test', function(){
  return exec('npm run test');
})

gulp.task('wixtest', ['getwix'], function(){
  return hydroexec({
    heatFiles: ['test/integration/heat.rsp'],
    candleFiles: ['test/integration/candle.rsp'],
    lightFiles: ['test/integration/light.rsp']
  });

});
