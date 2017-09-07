#!/usr/bin/env node
/* cfb.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* eslint-env node */
/* vim: set ts=2 ft=javascript: */
var X = require('../');
var fs = require('fs'), program = require('commander');
program
	.version(X.version)
	.usage('[options] <file>')
	.option('-q, --quiet', 'process but do not report')
	.option('-l, --list-files', 'list files')
	.option('-d, --dump', 'dump internal representation but do not extract')
	.option('--dev', 'development mode')
	.option('--read', 'read but do not print out contents');

program.parse(process.argv);

if(program.args.length === 0 || !fs.existsSync(program.args[0])) {
	console.error("Usage: " + process.argv[1] + " [-q] <cfb_file>");
	process.exit(1);
}

var opts = ({type:'file'}/*:any*/);
if(program.dev) opts.WTF = true;

var cfb = X.read(program.args[0], opts);
if(program.quiet) process.exit(0);

if(program.dump) {
	console.log("Full Paths:");
	console.log(cfb.FullPaths.map(function(x) { return "  " + x; }).join("\n"));
	console.log("Full Path Directory:");
	console.log(cfb.FullPathDir);
	process.exit(0);
}
if(program.listFiles) {
	var PRINTJ = require("printj"), sprintf = PRINTJ.sprintf;

	var format_date = function(date/*:Date*/)/*:string*/ {
		return sprintf("%02u-%02u-%02u %02u:%02u", date.getUTCMonth()+1, date.getUTCDate(), date.getUTCFullYear()%100, date.getUTCHours(), date.getUTCMinutes());
	};

	var basetime = new Date(1980,0,1);
	var cnt = 0;
	var rootsize = 0, filesize = 0;
	console.log("  Length     Date   Time    Name");
	console.log(" --------    ----   ----    ----");
	cfb.FileIndex.forEach(function(file, i) {
		switch(file.type) {
			case 5:
				basetime = file.ct || file.mt || basetime;
				rootsize = file.size;
				break;
			case 2:
				console.log(sprintf("%9lu  %s   %s", file.size, format_date(basetime), cfb.FullPaths[i]));
				filesize += file.size;
				++cnt;
		}
	});
	console.log(" --------                   -------");
	console.log(sprintf("%9lu                   %lu file%s", rootsize || filesize, cnt, (cnt !== 1 ? "s" : "")));

	process.exit(0);
}
for(var i=0; i!==cfb.FullPaths.length; ++i) {
	if(cfb.FullPaths[i].slice(-1) === "/") {
		console.error("mkdir " + cfb.FullPaths[i]);
		fs.mkdirSync(cfb.FullPaths[i]);
	} else {
		console.error("writing " + cfb.FullPaths[i]);
		fs.writeFileSync(cfb.FullPaths[i], /*::new Buffer((*/cfb.FileIndex[i].content/*:: :any))*/);
	}
}
