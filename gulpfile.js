var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function (cb) {
  console.log("执行清理流程");
  del(['./code/client/bin-debug/**/*']).then(paths => {
    cb();
  });
});

// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('build', ['clean'], function (cb) {
  gulp.src("./code/client/src/**/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest('./code/client/bin-debug'))
    .on('end', cb);
});

// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('test', ['clean', 'build'], function () {
  // 'build' 完成后
  console.log("执行测试流程");
});

gulp.task('default', ['clean', 'build', 'test']);