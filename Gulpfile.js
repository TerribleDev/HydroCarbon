var gulp = require('gulp');
var unzip = require('gulp-unzip');
var request = require('request');
var fs = require('fs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
require('babel-core/register');

gulp.task('download', function () {
  return request('http://wixtoolset.org/downloads/v3.11.0.129/wix311-binaries.zip').pipe(fs.createWriteStream('wixToolset.zip'));
});

gulp.task('getwix',['download'], function(){
  return gulp.src("wixToolset.zip")
   .pipe(unzip())
   .pipe(gulp.dest('./lib/wixFiles'));
});

gulp.task('pre-test', function () {
  return gulp.src('src/**/*.js')
    // Covering files
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true}

    ))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', function(){
  return gulp.src('test/unit/*.js')
  .pipe(mocha())
  .pipe(istanbul.writeReports());
  //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
  //usemocha
});
