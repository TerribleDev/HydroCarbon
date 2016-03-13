//require('babel-core/register');
var gulp = require('gulp');
var unzip = require('gulp-unzip');
var request = require('request');
var fs = require('fs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta')
var tap =  require('gulp-tap');
var coveralls = require('gulp-coveralls');
var babel = require('gulp-babel');

gulp.task('download', function () {
  return request('http://wixtoolset.org/downloads/v3.11.0.129/wix311-binaries.zip').pipe(fs.createWriteStream('wixToolset.zip'));
});

gulp.task('getwix',['download', 'prepublish'], function(){
  return gulp.src("wixToolset.zip")
   .pipe(unzip())
   .pipe(gulp.dest('./lib/wixFiles'))
   .pipe(gulp.dest('./test-tmp/wixFiles'));
});
gulp.task('pre-test', function () {
  return gulp.src('src/**/*.js')
    // Covering files
    .pipe(istanbul({Instrumenter: isparta.Instrumenter, includeUntested: true}), {read: false})
    // Force `require` to return covered files
    .pipe(gulp.dest('test-tmp/'))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test', 'getwix'], function () {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { lines: 70 } }));
});

//todo use babel
gulp.task('prepublish', function(){
gulp.src('src/**/*.js')
.pipe(babel({
  presets: ['es2015']
}))
.pipe(gulp.dest('lib'));

});

gulp.task('coveralls', ['test'], function(){
  process.env.COVERALLS_SERVICE_JOB_ID = process.env.APPVEYOR_BUILD_NUMBER;
  process.env.COVERALLS_GIT_COMMIT = process.env.APPVEYOR_REPO_COMMIT;
  gulp.src('coverage/**/lcov.info')
  .pipe(coveralls())
});
