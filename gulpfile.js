var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./code/client/tsconfig.json');

gulp.task('clean', function (cb) {
  console.log("开始清理");
  del(['./code/client/bin-debug/**/*'], cb);
});

gulp.task('compile', ['clean'], function () {
  console.log("开始编译");
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('./code/client/bin-debug'))
});

gulp.task('default', ['clean', 'compile']);