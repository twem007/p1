# Compound File Binary Format

This is a Pure-JS implementation of MS-CFB: Compound File Binary File Format, a
format used in many Microsoft file types (such as XLS and DOC)

# Utility Installation and Usage

With [npm](https://www.npmjs.org/package/cfb):

```bash
$ npm install -g cfb
$ cfb path/to/CFB/file
```

The command will extract the storages and streams in the container, generating
files that line up with the tree-based structure of the storage.  Metadata such
as the red-black tree are discarded.  The `-l` option displays a manifest.

# Library Installation and Usage

In the browser:

```html
<script src="cfb.js" type="text/javascript"></script>
```

In node:

```js
var CFB = require('cfb');
```

For example, to get the Workbook content from an XLS file:

```js
var cfb = CFB.read(filename, {type: 'file'});
var workbook = cfb.find('Workbook');
var data = workbook.content;
```

The `xlscfb.js` file is designed to be embedded in [js-xlsx](http://git.io/xlsx)

# API

Typescript definitions are maintained in `types/index.d.ts`.

The CFB object exposes the following methods and properties:

`CFB.parse(blob)` takes a nodejs Buffer or an array of bytes and returns an
parsed representation of the data.

`CFB.read(blob, options)` wraps `parse`.  `options.type` controls the behavior:

- `file`: `blob` should be a file name
- `base64`: `blob` should be a base64 string
- `binary`: `blob` should be a binary string

`CFB.find(cfb, path)` performs a case-insensitive match for the path (or file
name, if there are no slashes) and returns an entry object or null if not found.

## Container Object Description

The object returned by `parse` and `read` can be found in the source (`rval`).
It has the following properties and methods:

- `.find(path)` is equivalent to `CFB.find(cfb, path)` and should not be used.

- `.FullPaths` is an array of the names of all of the streams (files) and
  storages (directories) in the container.  The paths are properly prefixed from
  the root entry (so the entries are unique)

- `.FullPathDir` is an object whose keys are entries in `.FullPaths` and whose
  values are objects with metadata and content (described below)

- `.FileIndex` is an array of the objects from `.FullPathDir`, in the same order
  as `.FullPaths`.

- `.raw` contains the raw header and sectors

## Entry Object Description

The entry objects are available from `FullPathDir` and `FileIndex` elements of
the container object.

- `.name` is the (case sensitive) internal name
- `.type` is the type as defined in "Object Type" in [MS-CFB] 2.6.1:
  `2 (stream)` for files, `1 (storage)` for dirs, `5 (root)` for root)
- `.content` is a Buffer/Array with the raw content
- `.ct`/`.mt` are the creation and modification time (if provided in file)

# License

This implementation is covered under Apache 2.0 license.  It complies with the
[Open Specifications Promise](http://www.microsoft.com/openspecifications/)

[![Build Status](https://travis-ci.org/SheetJS/js-cfb.svg?branch=master)](https://travis-ci.org/SheetJS/js-cfb)

[![Coverage Status](http://img.shields.io/coveralls/SheetJS/js-cfb/master.svg)](https://coveralls.io/r/SheetJS/js-cfb?branch=master)

[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/SheetJS/js-cfb?pixel)](https://github.com/SheetJS/js-cfb)

[![NPM Downloads](https://img.shields.io/npm/dt/cfb.svg)](https://npmjs.org/package/cfb)

[![Dependencies Status](https://david-dm.org/sheetjs/js-cfb/status.svg)](https://david-dm.org/sheetjs/js-cfb)

[![ghit.me](https://ghit.me/badge.svg?repo=sheetjs/js-cfb)](https://ghit.me/repo/sheetjs/js-cfb)


