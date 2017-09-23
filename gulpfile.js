var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('./code/client/tsconfig.json');

gulp.task('clean', function (cb) {
  console.log("开始清理");
  del(['./code/client/bin-debug/**/*'], cb);
});

gulp.task('compile', function () {
  console.log("开始编译");
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./code/client/bin-debug'))
});

gulp.task('test', ['clean', 'compile'], function () {
  console.log("开始测试");
});

gulp.task('default', ['clean', 'compile', 'test']);