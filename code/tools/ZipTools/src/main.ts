import fs = require('fs');
let JSZip = require('jszip');
let zip = new JSZip();

let cfgPath: string = process.argv.splice(2, 1)[0] || process.cwd();
console.log(`读取目录：${cfgPath}`);
fs.readdir(cfgPath, function (err: NodeJS.ErrnoException, files: string[]): void {
    if (err) {
        console.log(`读取目录失败:${err.message}`);
        return;
    }
    //读取文件
    if (files) {
        for (let i: number = 0, iLen: number = files.length; i < iLen; i++) {
            let file: string = files[i];
            if (file.indexOf('.txt') >= 0) {
                console.log(`读取文件：${file}`);
                zip.file(`${file}`, fs.readFileSync(`${cfgPath}\\${file}`));
            }
        }
        zip.generateAsync({ type: "nodebuffer" })
            .then(function (content) {
                // see FileSaver.js
                writeFile(`${cfgPath}\\config.zip`, content);
            });
    }
})

function writeFile(path: string, data: any, options?: {
    encoding?: string;
    mode?: number;
    flag?: string;
}): void {
    let fd: number = fs.openSync(path, 'w');
    fs.writeFileSync(path, data, options);
    fs.closeSync(fd);
    console.log(`创建文件成功：${path}`);
}

/**
 *  字符参数替换
 * @param str       "参数替换{0}和{1}"
 * @param args      [x,y]    
 */
function formatString(str: string, args: string[]): string {
    if (str) {
        let reg: RegExp = /\{[0-9]+?\}/;
        while (str.match(reg)) {
            let arr: RegExpMatchArray = str.match(reg);
            let arg: RegExpMatchArray = arr[0].match(/[0-9]+?/);
            str = str.replace(reg, args[parseInt(arg[0])]);
        }
        return str;
    }
    return "";
}