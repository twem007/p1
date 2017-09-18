var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('./code/client/tsconfig.json');

gulp.task('clean', function (cb) {
  console.log("执行清理流程");
  del(['./code/client/bin-debug/**/*']).then(paths => {
    cb();
  });
});

gulp.task('compile', function (cb) {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./code/client/bin-debug'))
        .on('end', cb);
});

gulp.task('test', ['clean', 'compile'], function () {
  console.log("执行测试流程");
});

gulp.task('default', ['clean', 'compile', 'test']);