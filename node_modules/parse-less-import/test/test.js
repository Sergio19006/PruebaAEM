'use strict';

require('should');
const parse = require('../index');

describe('parse-less-import', () => {
  it(`should parse '@import "filepath";'`, () => {
    parse(`
      .abc {}
      @import "../a.less";
      .cde {}
      @import "../b";
    `).should.eql([{
      path: '../a.less',
      keywords: []
    }, {
      path: '../b',
      keywords: []
    }]);
    parse(`
      .abc {}
    `).should.eql([]);
  });
  it(`should parse '@import (keyword) "filepath";'`, () => {
    parse(`
      .abc {}
      @import (optional) "../a.less";
      .cde {}
      @import (multiple, reference) "../b";
    `).should.eql([{
      path: '../a.less',
      keywords: ['optional']
    }, {
      path: '../b',
      keywords: ['multiple', 'reference']
    }]);
  });
  it(`should not parse comments`, () => {
    parse(`
      .abc {}
      // @import (optional) "../a.less";
      /*
      .cde {}
      @import (multiple, reference) "../b";
      */
      @import (multiple, reference) "./c";
    `).should.eql([{
      path: './c',
      keywords: ['multiple', 'reference']
    }]);
  });
  it(`should parse '@import-once "filepath";'`, () => {
    parse(`
      .abc {}
      @import-once "../a.less";
      .cde {}
      @import-once "../b";
    `).should.eql([{
      path: '../a.less',
      keywords: ['once']
    }, {
      path: '../b',
      keywords: ['once']
    }]);
    parse(`
      .abc {}
    `).should.eql([]);
  });
  it(`should parse '@import-once (keyword) "filepath";'`, () => {
    parse(`
      .abc {}
      @import-once (optional) "../a.less";
      .cde {}
      @import-once (multiple, reference) "../b";
    `).should.eql([{
      path: '../a.less',
      keywords: ['once', 'optional']
    }, {
      path: '../b',
      keywords: ['once', 'multiple', 'reference']
    }]);
  });
  it(`should return empty array if empty content`, () => {
    parse(``).should.eql([]);
  });
  it(`should return empty array if no content`, () => {
    parse().should.eql([]);
  });
});
