var gulp = require('gulp');
var unzip = require('gulp-unzip');
var request = require('request');
var fs = require('fs');
gulp.task('download', function () {
  return request('http://wixtoolset.org/downloads/v3.11.0.129/wix311-binaries.zip').pipe(fs.createWriteStream('wixToolset.zip'));
});

gulp.task('getwix',['download'], function(){
  return gulp.src("wixToolset.zip")
   .pipe(unzip())
   .pipe(gulp.dest('./wixFiles'));
});
