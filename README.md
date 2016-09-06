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