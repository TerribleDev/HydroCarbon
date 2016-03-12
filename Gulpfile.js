var gulp = require('gulp');
var unzip = require('gulp-unzip');
var request = require('request');
var fs = require('fs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');


gulp.task('download', function () {
  return request('http://wixtoolset.org/downloads/v3.11.0.129/wix311-binaries.zip').pipe(fs.createWriteStream('wixToolset.zip'));
});

gulp.task('getwix',['download'], function(){
  return gulp.src("wixToolset.zip")
   .pipe(unzip())
   .pipe(gulp.dest('./lib/wixFiles'));
});
var paths = {
    server: {
        scripts:  ['src/**/*.js'],
        tests:    ['test/**/*.js'],
        coverage: 'coverage/'
    }
};

gulp.task('test-coverage-server', function(cb) {
    var coverageDir = paths.server.coverage;
    gulp.src(paths.server.scripts)
        .pipe(istanbul({ // Covering files
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function() {
            gulp.src(paths.server.tests, {read: false})
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: coverageDir,
                    reportOpts: {dir: coverageDir},
                    reporters: ['text', 'text-summary', 'json', 'html']
                }))
                .on('end', cb);
        });
});

gulp.task('pre-test', function () {
  return gulp.src(['src/CommandBuilder.js'])
    // Covering files
    .pipe(istanbul({
    //  instrumenter: isparta.Instrumenter,
      includeUntested: true}

    ))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test',['pre-test'], function(){
  return gulp.src('test/unit/*.js')
  .pipe(mocha())
  .pipe(istanbul.writeReports());
  //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
  //usemocha
});
