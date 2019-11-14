'use strict';

require('should');
const tree = require('../index');
const path = require('path');
const CWD = process.cwd();

describe('less-tree', () => {
  const basePath = path.join(__dirname, 'source');
  it('should to tree object', () => {
    tree('a.less', basePath, false).toTreeObject().should.be.eql({
      'b.less': {
        'd.less': {
          "sub/f.less": {
            "sub/e.less": {}
          }
        }
      },
      'c.less': {
        'd.less': {
          "sub/f.less": {
            "sub/e.less": {}
          }
        }
      },
      'sub/e.less': {},
      'g.less': {}
    });
  });
  it('should to tree string', () => {
    tree('a.less', basePath, false).toTreeString().trim().should.be.eql(`
├─ b.less
│  └─ d.less
│     └─ sub/f.less
│        └─ sub/e.less
├─ c.less
│  └─ d.less
│     └─ sub/f.less
│        └─ sub/e.less
├─ sub/e.less
└─ g.less
   `.trim());
  });
});
