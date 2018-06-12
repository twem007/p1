var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var typedoc = require("gulp-typedoc");
var tsProject = ts.createProject('./code/client/tsconfig.json', { "noEmit": false });

gulp.task('clean', function (cb) {
  return del(['./code/client/bin-debug/**/*']);
});

gulp.task('compile', ['clean'], function (cb) {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('./code/client/bin-debug'))
    .on('error', function (err) {
      cb(err);
    });
});

gulp.task('doc', ['compile'], function () {
  return gulp.src(['./code/client/libs/**/*.ts',
    './code/client/src/core/**/*.ts'])
    .pipe(typedoc({
      version: true,
      module: "commonjs",
      target: "ES5",
      tsconfig: "./code/client/tsconfig.json",
      out: "docs/wiki/",
      name: "p1 wiki"
    }));
});

gulp.task('default', ['clean', 'compile', 'doc']);