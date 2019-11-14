'use strict';

const createFileTree = require('./lib/createFileTree');

module.exports = (filePath, basePath, resetCache) => createFileTree(filePath, basePath, resetCache);
