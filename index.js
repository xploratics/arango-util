var debug = require('debug')('arango-util');

exports.collectionExists = function (options) {
    debug(`checking if collection '${options.name}' exists`);

    return options
        .server
        .collections()
        .then(collections => collections.some(c => c.name === options.name))
        .then(function (exists) {
            debug(`collection '${options.name}'${exists ? '' : ' does not'} exists`);
            return exists;
        });
};

exports.databaseExists = function (options) {
    debug(`checking if database '${options.name}' exists`);

    return options
        .server
        .listDatabases()
        .then(list => list.indexOf(options.name) > -1)
        .then(function (exists) {
            debug(`database '${options.name}'${exists ? '' : ' does not'} exists`);
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

exports.getDatabaseVersion = options => exports
    .ensureCollectionExists({ server: options.server, name: 'versions' })
    .then(_ => options
        .server
        .transaction({ write: 'versions' }, String(function () {
            var versions = require('org/arangodb').db.versions;
            var v = versions.documents(['master']).documents[0];

            if (!v)
                versions.insert({ _key: 'master', version: 0 });

            return v && v.version || 0;
        }))
    );