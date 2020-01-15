"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var argv = require('yargs').argv;
var JSZip = require('jszip');
var zip = new JSZip();
var filePath = argv.filePath || process.cwd();
var os = argv.os || 'windows';
console.log("\u8BFB\u53D6\u76EE\u5F55\uFF1A" + filePath + " \u8BFB\u53D6\u7CFB\u7EDF\uFF1A" + os);
var imgRegExp = /.+\.(jpg|bmp|gif|png)$/i;
var txtRegExp = /.+\.(txt)$/i;
var jsRegExp = /.+\.(js)$/i;
readRegExpFiles(txtRegExp.source, 'config.bin');
function readRegExpFiles(regExp, output) {
    var files = readFiles(filePath);
    //读取文件
    if (files) {
        for (var i = 0, iLen = files.length; i < iLen; i++) {
            var file = files[i];
            if (file.match(regExp)) {
                console.log("\u8BFB\u53D6\u6587\u4EF6\uFF1A" + file);
                var index = null;
                if (os == 'mac') {
                    index = file.lastIndexOf('/') + 1;
                }
                else {
                    index = file.lastIndexOf('\\') + 1;
                }
                zip.file(file.substring(index), fs.readFileSync(file));
            }
        }
        zip.generateAsync({
            type: "nodebuffer",
            compression: 'DEFLATE',
            compressionOptions: {
                level: 6,
            },
        }).then(function (content) {
            // see FileSaver.js
            if (os == 'mac') {
                writeFile(filePath + "/" + output, content);
            }
            else {
                writeFile(filePath + "\\" + output, content);
            }
        });
    }
}
function writeFile(path, data, options) {
    var fd = fs.openSync(path, 'w');
    fs.writeFileSync(path, data, options);
    fs.closeSync(fd);
    console.log("\u521B\u5EFA\u6587\u4EF6\u6210\u529F\uFF1A" + path);
}
function readFiles(path) {
    var results = [];
    var list = fs.readdirSync(path);
    list.forEach(function (file, index, list) {
        if (os == 'mac') {
            file = path + '/' + file;
        }
        else {
            file = path + '\\' + file;
        }
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(readFiles(file));
        }
        else {
            results.push(file);
        }
    });
    return results;
}
//# sourceMappingURL=main.js.map