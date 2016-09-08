[![Build Status](https://travis-ci.org/xploratics/arango-util.svg)](https://travis-ci.org/xploratics/arango-util)
[![dependencies Status](https://david-dm.org/xploratics/arango-util/status.svg)](https://david-dm.org/xploratics/arango-util)
[![devDependencies Status](https://david-dm.org/xploratics/arango-util/dev-status.svg)](https://david-dm.org/xploratics/arango-util?type=dev)

# arango-util
Utilities and helper functions for arangodb.

## Installation

```bash
npm install arango-util
```



## Collection functions

### collectionExists
Verify if a collection exists.

#### options

- server: arangojs database object
- name: name of the collection

#### returns
A promise containing true if the collection exists, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

util.collectionExists({ server, name: 'myCollection' })
    .then(function (exists) {
        console.log('Collection exists?: ', exists);
    });
```

### ensureCollectionExists
Verify if a collection exists.
If the collection does not exists, it will be created.
If the collection exists, it does nothing.

#### options

- server: arangojs database object
- name: name of the collection

#### returns
A promise containing true if the collection has been created, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

util.ensureCollectionExists({ server, name: 'myCollection' })
    .then(function (created) {
        console.log('Does the collection have been created?: ', created);
    });
```

### getByKey
Gets a document by key in a specified collection.
If the document is found, it is returned otherwise, null.

#### options
- collection: Can be either a string or an arangojs collection object. Note: when a string is used, you need to also specify a server object.
- key: the key of the document.
- server: arangojs database object. Note: when used, you need to specify a colletion name argument.

#### returns
A promise containing the document or null if the document is not found.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

// using the server and collection name
util.getByKey({ server, collection: 'users', key: 'user1' })
    .then(function (user) {
        // if user is found or null.
    });

var collection = server.collection('users');

// using only the collection
util.getByKey({ collection, key: 'user1' })
    .then(function (user) {
        // if user is found or null.
    });
```

### removeByKey
Removes a document by key from a specified collection.
If the document is found, it returns true, otherwise, false.

#### options
- collection: Can be either a string of an arangojs collection object. Note: when a string is used, you must provide an arango server object.
- key: the key of the document.
- server: arangojs database object. NOte: when used, you need to specifiy a collection name argument.

#### returns
A promise containing true if the document have been removed or false if the document already does not exists.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

// using the server and collection name
util.removeByKey({ server, collection: 'users', key: 'user1' })
    .then(function (found) {
    });

var collection = server.collection('users');

// using only the collection
util.removeByKey({ collection, key: 'user1' })
    .then(function (found) {
    });
```




## Database functions

### databaseExists
Verify if a database exists.

#### options

- server: arangojs object
- name: name of the database

#### returns
A promise containing true if the database exists, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

util.databaseExists({ server, name: 'db' })
    .then(function (exists) {
        console.log('Database exists?: ', exists);
    });
```

### ensureDatabaseExists
Verify if a database exists.
If the database does not exists, it will be created.
If the database exists, it does nothing.

#### options

- server: arangojs object
- name: name of the database

#### returns
A promise containing true if the database has been created, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

util.ensureDatabaseExists({ server, name: 'db' })
    .then(function (created) {
        console.log('Does the database have been created?: ', created);
    });
```

## Licence
MIT License