'use strict';

const fs = require('fs-extra');
const File = require('vinyl');
const path = require('path');
const treeify = require('treeify');
const parseDep = require('./parseDep');
const objectify = require('./objectify');
let cache = {};
let base;

function createFileTree(filePath, basePath, resetCache) {
    base = basePath;

    // Reset cache, so we get new data if files were updated in the meantime
    if (resetCache) {
        cache = {};
    }

    // If no filePath/base or it is the same as base, nothing to do so immediate return
    if (!filePath || !base || filePath === base) {
        return;
    } else {
        return _recurse(filePath);
    }
}

function _recurse(filePath) {
    if (!cache[filePath]) {
        let file = _tryReadFile(filePath);
        if (file) {
            file.children = parseDep(file).map(_recurse).filter(file => !!file);
            file.toTreeObject = () => objectify(file);
            file.toTreeString = () => treeify.asTree(file.toTreeObject(), true);
            cache[filePath] = file;
        } else {
            // file not found so add dummy we can check later
        }
    }
    return cache[filePath];
}

function _tryReadFile(filePath) {
    // Check if file starts with base, otherwise add it
    const newPath = (filePath.indexOf(base) === 0)
        ? filePath
        : path.isAbsolute(filePath)
            // filePath is absolute (in less import, so append what is after the root)
            ? path.resolve(base, path.relative(path.sep, filePath))
            // If it is relative just join with base
            : path.join(base, filePath);

    let content;
    try {
        content = fs.readFileSync(newPath);
    } catch (err) {
        // Problem with file, so try next prefix
        console.warn('TRYREADFILE WARN COULD NOT READ FILE ', newPath);
    }

    const vinylFile = _buildFile(newPath, content, base);
    return vinylFile;
}

function _buildFile(path, content, basePath) {
    var obj = {
        path: path
    };

    if (content) {
        obj.contents = content;
    }
    if (base) {
        obj.base = basePath;
    }
    
    const vinylFile = new File(obj);
    return vinylFile;
}

module.exports = createFileTree;
