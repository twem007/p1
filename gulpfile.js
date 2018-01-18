var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./code/client/tsconfig.json');

gulp.task('clean', function (cb) {
  return del(['./code/client/bin-debug/**/*']);
});

gulp.task('compile', ['clean'], function () {
  return tsProject.src()
    .pipe(tsProject({ "noEmit": true }))
    .pipe(gulp.dest('./code/client/bin-debug'))
});

gulp.task('default', ['clean', 'compile'], function () {
  console.log("编译测试完成");
});