var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./code/client/tsconfig.json', { "noEmit": false });

gulp.task('clean', function (cb) {
  return del(['./code/client/bin-debug/**/*']);
});

gulp.task('compile', ['clean'], function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('./code/client/bin-debug'))
    .on('error', function (err) {
      throw Error(err.message);
    });
});

gulp.task('default', ['clean', 'compile']);