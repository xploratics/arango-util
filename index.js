var assert = require('assert');
var debug = require('debug')('arango-util');
var Promise = require('bluebird');

exports.collectionExists = function (options) {
    var name = options && options.name;
    var server = options && options.server;

    assert.ok(name, 'name of collection should be defined.');
    assert.ok(server, 'server should be an arangodb database');
    debug(`checking if collection '${name}' exists`);

    return server
        .collections()
        .then(collections => collections.some(c => c.name === name))
        .then(function (exists) {
            debug(`collection '${name}'${exists ? '' : ' does not'} exists`);
            return exists;
        });
};

exports.databaseExists = function (options) {
    var name = options && options.name;
    var server = options && options.server;

    assert.ok(name, 'name of database should be defined.');
    assert.ok(server, 'server should be an arangodb database');
    debug(`checking if database '${name}' exists`);

    return server
        .listDatabases()
        .then(list => list.indexOf(name) > -1)
        .then(function (exists) {
            debug(`database '${name}'${exists ? '' : ' does not'} exists`);
            return exists;
        });
};

exports.ensureCollectionExists = options => exports
    .collectionExists(options)
    .then(function (exists) {
        if (exists)
            return false;

        debug(`creating collection '${options.name}'`);

        return options.server
            .collection(options.name)
            .create()
            .then(function () {
                debug(`collection '${options.name}' created.`);
                return true;
            });
    });

exports.ensureDatabaseExists = options => exports
    .databaseExists(options)
    .then(function (exists) {
        if (exists)
            return false;

        debug(`creating database '${options.name}'`);

        return options.server
            .createDatabase(options.name)
            .then(function () {
                debug(`database '${options.name}' created.`);
                return true;
            });
    })
    .then(function (v) {
        options.server.useDatabase(options.name);
        return v;
    });

exports.getByKey = function (options) {
    if (!options) options = {};
    
    var collection = options.collection;
    var key = options.key;
    var server = options.server;

    if (typeof collection === 'string') {
        assert.ok(server, 'server should be specified when using a collection');
        collection = server.collection(collection);
    } else
        assert.ok(collection, 'collection should be specified');

    debug(`fetching document '${key}' from '${collection.name}'`);

    return collection.document(key).then(documentFound, handleError);

    function documentFound(e) {
        debug(`found document ${key}`);
        return e;
    }

    function handleError(e) {
        if (e.errorNum === 1202) {
            debug(`document '${key}' not found.`);
            return null;
        } else
            debug(`error fetching document '${key}' from '${collection.name}'\n${e.toString()}`);
        
        return Promise.reject(e);
    }
};

exports.removeByKey = function (options) {
    if (!options) options = {};
    
    var collection = options.collection;
    var key = options.key;
    var server = options.server;

    if (typeof collection === 'string') {
        assert.ok(server, 'server should be specified when using a collection');
        collection = server.collection(collection);
    } else
        assert.ok(collection, 'collection should be specified');

    debug(`removing document '${key}' from '${collection.name}'`);

    return collection.remove(key).then(documentRemoved, handleError);

    function documentRemoved(e) {
        debug(`document ${key} removed`);
        return true;
    }

    function handleError(e) {
        if (e.errorNum === 1202) {
            debug(`document '${key}' not found.`);
            return false;
        } else
            debug(`error removing docment '${key}' from '${collection.name}'\n${e.toString()}`);
        
        return Promise.reject(e);
    }
};