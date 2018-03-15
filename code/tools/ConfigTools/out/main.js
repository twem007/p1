"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var xlsx = require("node-xlsx");
var xlsxPath = process.argv.splice(2, 1)[0] || process.cwd();
var outPath = xlsxPath + "\\outFile";
console.log("\u8BFB\u53D6\u76EE\u5F55\uFF1A" + xlsxPath);
fs.readdir(xlsxPath, function (err, files) {
    if (err) {
        console.log("\u8BFB\u53D6\u76EE\u5F55\u5931\u8D25:" + err.message);
        return;
    }
    if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath);
    }
    var clientDir = outPath + "\\client";
    if (!fs.existsSync(clientDir)) {
        fs.mkdirSync(clientDir);
    }
    var serverDir = outPath + "\\server";
    if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir);
    }
    //创建客户端代码结构
    var defFileStr = "\/**\n * 该文件为工具自动生成，请勿自行修改。\n **\/\n";
    var templete = "class {0} {\n{1}}\n";
    //读取文件
    if (files) {
        for (var i = 0, iLen = files.length; i < iLen; i++) {
            var file = files[i];
            if (file.indexOf('.xlsx') >= 0) {
                console.log("\u8BFB\u53D6\u6587\u4EF6\uFF1A" + file);
                var buffer = fs.readFileSync(xlsxPath + "\\" + file);
                var sheets = xlsx.parse(buffer);
                if (sheets.length == 0) {
                    return;
                }
                var sheet = sheets[0];
                var sheetData = sheet.data;
                //解析结构数据
                var fileName = sheetData[0][1];
                var remarks = sheetData[1];
                var channels = sheetData[3];
                var keys = sheetData[4];
                var types = sheetData[5];
                //创建客户端配置定义代码
                var keyTemplate = "";
                for (var i_1 = 0, iLen_1 = keys.length; i_1 < iLen_1; i_1++) {
                    var channel = channels[i_1];
                    if ((channel & 1) == 1) {
                        var remark = remarks[i_1] || "";
                        remark = remark.replace(/\n/g, '\n\t * ');
                        var remarkStr = "\t/**\n\t * " + remark + "\n\t **/";
                        var variableStr = "public " + keys[i_1] + ":" + formatKeyType(types[i_1]) + ";\n";
                        keyTemplate += remarkStr + "\n\t" + variableStr;
                    }
                }
                defFileStr += formatString(templete, [fileName, keyTemplate]);
                //创建文件数据
                var clientData = {};
                var serverData = {};
                clientData.name = fileName;
                serverData.name = fileName;
                var size = sheetData.length - 6;
                clientData.dataSize = size;
                serverData.dataSize = size;
                clientData.key = keys[0];
                serverData.key = keys[0];
                clientData.data = [];
                serverData.data = [];
                //解析表数据
                for (var i_2 = 6, iLen_2 = sheetData.length; i_2 < iLen_2; i_2++) {
                    var rowData = sheetData[i_2];
                    if (rowData && rowData.length > 0) {
                        var data_client = {};
                        var data_server = {};
                        for (var j = 0, jLen = rowData.length; j < jLen; j++) {
                            var channel = channels[j];
                            switch (channel & 1) {
                                case 1:
                                    data_client[keys[j]] = formatValueType(types[j], rowData[j]);
                                    break;
                                case 2:
                                    data_server[keys[j]] = rowData[j];
                                    break;
                                case 3:
                                    data_client[keys[j]] = formatValueType(types[j], rowData[j]);
                                    data_server[keys[j]] = rowData[j];
                                    break;
                            }
                        }
                        clientData.data.push(data_client);
                        serverData.data.push(data_server);
                    }
                }
                //创建配置文件
                var clientFilePath = outPath + "\\client\\" + fileName + ".txt";
                writeFile(clientFilePath, JSON.stringify(clientData));
                var serverFilePath = outPath + "\\server\\" + fileName + ".txt";
                writeFile(serverFilePath, JSON.stringify(serverData));
            }
        }
    }
    var defFileName = 'ConfigDef';
    var defFilePath = outPath + "\\client\\" + defFileName + ".ts";
    writeFile(defFilePath, defFileStr);
});
function writeFile(path, data) {
    var fd = fs.openSync(path, 'w');
    fs.writeFileSync(path, data, { flag: 'w' });
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
function formatKeyType(type) {
    switch (type) {
        case "int32":
        case "float":
            return "number";
        case "string":
            return "string";
        case "boolean":
            return "boolean";
    }
}
function formatValueType(type, value) {
    switch (type) {
        case "int32":
        case "float":
            return Number(value);
        case "string":
            return value + "";
        case "boolean":
            return Boolean(value);
    }
}
//# sourceMappingURL=main.js.map