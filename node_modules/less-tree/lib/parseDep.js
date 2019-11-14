'use strict';

const path = require('path');
const parse = require('parse-less-import');
const addExtLess = require('./addExt')('less');
module.exports = file => {
  return ((file && file.contents && parse(file.contents.toString())) || [])
    .map(dep => addExtLess(path.resolve(path.dirname(file.path), dep.path)));
};
