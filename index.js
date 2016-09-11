var assert = require('assert');
var debug = require('debug')('arango-util');

exports.collectionExists = function (collection) {
    debug(`checking if collection '${collection.name}' exists.`);
    
    return collection.get().then(ok, error);

    function ok() {
        debug(`collection '${collection.name}' exists.`);
        return true;
    }

    function error(err) {
        if (err.errorNum === 1203) {
            debug(`collection '${collection.name}' does not exists.`);
            return false;
        }
        return Promise.reject(err);
    }
};

exports.databaseExists = function (database) {
    debug(`checking if database '${database.name}' exists.`);
    
    return database.get().then(ok, error);

    function ok() {
        debug(`database '${database.name}' exists.`);
        return true;
    }

    function error(err) {
        if (err.errorNum === 1228) {
            debug(`database '${database.name}' does not exists.`);
            return false;
        }
        return Promise.reject(err);
    }
};

exports.dropCollection = function (collection) {
    var name = collection.name;
    debug(`attempting to remove collection '${name}'.`);

    return collection.drop().then(ok, error);

    function ok() {
        debug(`collection '${name}' has been removed.`);
        return true;
    }

    function error(err) {
        if (err.errorNum === 1203) {
            debug(`collection '${name}' do not exists.`);
            return false;
        }

        debug(`error while removing collection '${name}'.`);
        return Promise.reject(err);
    }
};

exports.ensureCollectionExists = function (collection) {
    var name = collection.name;
    debug(`attempting to create collection '${name}'.`);

    return collection.create().then(ok, error);

    function ok() {
        debug(`collection '${name}' has been created.`);
        return true;
    }

    function error(err) {
        if (err.errorNum === 1207) {
            debug(`collection '${name}' already exists.`);
            return false;
        }

        debug(`error while creating collection '${name}'.`);
        return Promise.reject(err);
    }
};

exports.ensureDatabaseExists = function (database) {
    var name = database.name;
    database.useDatabase('_system');

    debug(`attempting to create database '${name}'.`);

    return database.createDatabase(name).then(ok, error);

    function ok() {
        debug(`database '${name}' has been created.`);
        database.useDatabase(name);
        return true;
    }

    function error(err) {
        database.useDatabase(name);

        if (err.errorNum === 1207) {
            debug(`database '${name}' already exists.`);
            return false;
        }

        debug(`error while creating database '${name}'.`);
        return Promise.reject(err);
    }
};

exports.getByKey = function (options) {
    assert.ok(options, 'options should be specified');
    
    var collection = options.collection;
    var key = options.key;

    assert.ok(collection, 'collection should be specified');
    debug(`fetching document '${key}' from '${collection.name}'`);

    return collection.document(key).then(ok, error);

    function ok(e) {
        debug(`found document ${key}`);
        return e;
    }

    function error(e) {
        if (e.errorNum === 1202) {
            debug(`document '${key}' not found.`);
            return null;
        } else
            debug(`error fetching document '${key}' from '${collection.name}'`);
        
        return Promise.reject(e);
    }
};

exports.removeByKey = function (options) {
    assert.ok(options, 'options should be specified');
    
    var collection = options.collection;
    var key = options.key;

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