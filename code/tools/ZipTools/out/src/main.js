"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var JSZip = require('jszip');
var zip = new JSZip();
console.log("\u5F53\u524D\u76EE\u5F55\uFF1A" + process.cwd());
var cfgPath = process.argv.splice(2, 1)[0] || process.cwd();
fs.readdir(cfgPath, function (err, files) {
    if (err) {
        console.log("\u8BFB\u53D6\u76EE\u5F55\u5931\u8D25:" + err.message);
        return;
    }
    //读取文件
    if (files) {
        for (var i = 0, iLen = files.length; i < iLen; i++) {
            var file = files[i];
            if (file.indexOf('.txt') >= 0) {
                console.log("\u8BFB\u53D6\u6587\u4EF6\uFF1A" + file);
                zip.file("" + file, fs.readFileSync(file));
            }
        }
        var data = zip.generate({ base64: false, compression: 'DEFLATE' });
        writeFile('config.zip', data);
    }
});
function writeFile(path, data, options) {
    var fd = fs.openSync(path, 'w');
    fs.writeFileSync(path, data, options);
    fs.closeSync(fd);
    console.log("\u521B\u5EFA\u6587\u4EF6\u6210\u529F\uFF1A" + path);
}
/**
 *  字符参数替换
 * @param str       "参数替换{0}和{1}"
 * @param args      [x,y]
 */
function formatString(str, args) {
    if (str) {
        var reg = /\{[0-9]+?\}/;
        while (str.match(reg)) {
            var arr = str.match(reg);
            var arg = arr[0].match(/[0-9]+?/);
            str = str.replace(reg, args[parseInt(arg[0])]);
        }
        return str;
    }
    return "";
}
//# sourceMappingURL=main.js.map