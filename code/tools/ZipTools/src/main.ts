import fs = require('fs');
let JSZip = require('jszip');
let zip = new JSZip();

let filePath: string = process.argv.splice(2, 1)[0] || process.cwd();
console.log(`读取目录：${filePath}`);
const imgRegExp: RegExp = /.+\.(jpg|bmp|gif|png)$/i;
const txtRegExp: RegExp = /.+\.(txt)$/i;
const jsRegExp: RegExp = /.+\.(js)$/i;

readRegExpFiles(txtRegExp.source);

function readRegExpFiles(regExp: string): void {
    let files = readFiles(filePath);
    //读取文件
    if (files) {
        for (let i: number = 0, iLen: number = files.length; i < iLen; i++) {
            let file: string = files[i];
            if (file.match(regExp)) {
                console.log(`读取文件：${file}`);
                zip.file(file.substring(file.lastIndexOf('\\') + 1), fs.readFileSync(file));
            }
        }
        zip.generateAsync({ type: "nodebuffer" })
            .then(function (content) {
                // see FileSaver.js
                writeFile(`${filePath}\\output.zip`, content);
            });
    }
}

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

function readFiles(path: string): string[] {
    let results: string[] = [];
    let list: string[] = fs.readdirSync(path);
    list.forEach((file: string, index: number, list: string[]) => {
        file = path + '\\' + file;
        let stat: fs.Stats = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(readFiles(file));
        } else {
            results.push(file);
        }
    })
    return results;
}