global.expect = require('chai').expect;
global.fail = err => expect(err).to.be.undefined();
global.server = require('arangojs')({ url: 'http://root:pass@127.0.0.1:8529' });
global.util = require('../');
