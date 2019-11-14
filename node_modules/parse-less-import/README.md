# parse-less-import

[![Test coverage](https://img.shields.io/coveralls/LingyuCoder/parse-less-import.svg?style=flat-square)](https://coveralls.io/r/LingyuCoder/parse-less-import?branch=master)
[![Build Status](https://travis-ci.org/LingyuCoder/parse-less-import.png)](https://travis-ci.org/LingyuCoder/parse-less-import)
[![Dependency Status](https://david-dm.org/LingyuCoder/parse-less-import.svg)](https://david-dm.org/LingyuCoder/parse-less-import)
[![devDependency Status](https://david-dm.org/LingyuCoder/parse-less-import/dev-status.svg)](https://david-dm.org/LingyuCoder/parse-less-import#info=devDependencies)
[![NPM version](http://img.shields.io/npm/v/parse-less-import.svg?style=flat-square)](http://npmjs.org/package/parse-less-import)
[![node](https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square)](http://nodejs.org/download/)
[![License](http://img.shields.io/npm/l/parse-less-import.svg?style=flat-square)](LICENSE)
[![npm download](https://img.shields.io/npm/dm/parse-less-import.svg?style=flat-square)](https://npmjs.org/package/parse-less-import)

Parse import from less file

**Node.js >= 4.0.0**

## Install

```bash
$ npm install --save parse-less-import
```

## Usage

```javascript
const parse = require('parse-less-import');

const content = `
@import '../a';
@import './b.less';
@import (multiple) './c.less';
@import (multiple, reference) './d.less';
`;

parse(content);
/*
[ { path: '../a', keywords: [] },
  { path: './b.less', keywords: [] },
  { path: './c.less', keywords: [ 'multiple' ] },
  { path: './d.less', keywords: [ 'multiple', 'reference' ] } ]
*/
```

## Test

```bash
$ npm run test
$ npm run test-cov
$ npm run test-travis
```

## License

The MIT License (MIT)

Copyright (c) 2015 LingyuCoder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
