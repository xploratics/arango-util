global.database = require('arangojs')({ url: 'http://root:pass@127.0.0.1:8529' });
global.expect = require('chai').expect;
global.util = require('../');

global.database.useDatabase('db');
