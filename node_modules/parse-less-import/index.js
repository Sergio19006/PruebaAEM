'use strict';

const RE_IMPORT = /@import(?:-(once))?(?:\s+\((.*)\))?\s+['"](.*)['"]/;
const RE_IMPORT_G = /@import(?:-(once))?(?:\s+\((.*)\))?\s+['"](.*)['"]/g;
const RE_COMMENT = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm;

module.exports = contents => {
  return ((contents && contents.replace(RE_COMMENT, '').match(RE_IMPORT_G)) || [])
    .map(dep => {
      const m = dep.match(RE_IMPORT);
      const keywords = [m[1], m[2]].join(',');
      return {
        path: m[3],
        keywords: keywords.split(',').map(str => str.trim()).filter(v => !!v)
      };
    })
    .filter(v => !!v);
};
