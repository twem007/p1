import fs = require('fs');
const argv = require('yargs').argv;
let JSZip = require('jszip');
let zip = new JSZip();

let filePath: string = argv.filePath || process.cwd();
let os: string = argv.os || 'windows';

console.log(`读取目录：${filePath} 读取系统：${os}`);
const imgRegExp: RegExp = /.+\.(jpg|bmp|gif|png)$/i;
const txtRegExp: RegExp = /.+\.(txt)$/i;
const jsRegExp: RegExp = /.+\.(js)$/i;

readRegExpFiles(txtRegExp.source, 'config.bin');

function readRegExpFiles(regExp: string, output: string): void {
    let files = readFiles(filePath);
    //读取文件
    if (files) {
        for (let i: number = 0, iLen: number = files.length; i < iLen; i++) {
            let file: string = files[i];
            if (file.match(regExp)) {
                console.log(`读取文件：${file}`);
                let index: number = null;
                if (os == 'mac') {
                    index = file.lastIndexOf('/') + 1;
                } else {
                    index = file.lastIndexOf('\\') + 1;
                }
                zip.file(file.substring(index), fs.readFileSync(file));
            }
        }
        zip.generateAsync({
            type: "nodebuffer",
            compression: 'DEFLATE', //  force a compression for this file
            compressionOptions: { //  使用壓縮等級，1-9級，1級壓縮比最低，9級壓縮比最高
                level: 6,
            },
        }).then(function (content) {
            // see FileSaver.js
            if (os == 'mac') {
                writeFile(`${filePath}/${output}`, content);
            } else {
                writeFile(`${filePath}\\${output}`, content);
            }
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
        if (os == 'mac') {
            file = path + '/' + file;
        } else {
            file = path + '\\' + file;
        }
        let stat: fs.Stats = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(readFiles(file));
        } else {
            results.push(file);
        }
    })
    return results;
}