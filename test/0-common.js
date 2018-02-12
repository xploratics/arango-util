global.database = require('arangojs')({
    url: 'http://localhost:8529'
});
global.expect = require('chai').expect;
global.util = require('../');

global.database.useDatabase('db').useBasicAuth('root', 'pass');