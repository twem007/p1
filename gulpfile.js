var gulp = require('gulp');
var del = require('del');
// 在 shell 中执行一个命令
var exec = require('child_process').exec;

gulp.task('clean', function (cb) {
  console.log("执行清理流程");
  del([
    'code/client/bin-debug/*',
  ], cb);
});

// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('build', ['clean'], function (cb) {
  console.log("执行构建流程");
  cb(); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
});

let every = function () {
  console.log(`开始处理文件`);
}

// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('test', ['clean', 'build'], function () {
  // 'build' 完成后
  console.log("执行测试流程");
});

gulp.task('default', ['clean', 'build', 'test']);