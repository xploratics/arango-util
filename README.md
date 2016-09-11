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

#### arguments

- collection: arangojs collection object

#### returns
A promise containing true if the collection exists, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');
var collection = server.collection('myCollection');

util.collectionExists(collection)
    .then(function (exists) {
        console.log('Collection exists?: ', exists);
    });
```

### ensureCollectionExists
Verify if a collection exists.
If the collection does not exists, it will be created.
If the collection exists, it does nothing.

#### arguments

- collection: arangojs collection object

#### returns
A promise containing true if the collection has been created, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

var collection = server.collection('myCollection');

util.ensureCollectionExists(collection)
    .then(function (created) {
        console.log('Does the collection have been created?: ', created);
    });
```

### getByKey
Gets a document by key in a specified collection.
If the document is found, it is returned otherwise, null.

#### options
- collection: an arangojs collection object.
- key: the key of the document.

#### returns
A promise containing the document or null if the document is not found.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

var collection = server.collection('users');

util.getByKey({ collection, key: 'user1' })
    .then(function (user) {
        // if user is found or null.
    });
```

### removeByKey
Removes a document by key from a specified collection.
If the document is found, it returns true, otherwise, false.

#### options
- collection: an arangojs collection object.
- key: the key of the document.

#### returns
A promise containing true if the document have been removed or false if the document already does not exists.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

var collection = server.collection('users');

util.removeByKey({ collection, key: 'user1' })
    .then(function (found) {
    });
```




## Database functions

### databaseExists
Verify if a database exists.

#### arguments

- database: an arangojs database object

#### returns
A promise containing true if the database exists, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

util.databaseExists(server)
    .then(function (exists) {
        console.log('Database exists?: ', exists);
    });
```

### dropDatabase
Attempt to remove a database and returns true if the database have been removed, 
otherwise false.

#### arguments

- database: an arangojs database object

#### returns
A promise containing true if the database have been removed, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

util.dropDatabase(server)
    .then(function (exists) {
        console.log('Database removed?: ', exists);
    });
```

### ensureDatabaseExists
Verify if a database exists.
If the database does not exists, it will be created.
If the database exists, it does nothing.

#### arguments

- database: an arangojs database object

#### returns
A promise containing true if the database has been created, otherwise false.

#### example

```js
var server = require('arangojs')({ url: 'root@127.0.0.1:8529' });
var util = require('arango-util');

server.useDatabase('db');

util.ensureDatabaseExists(server)
    .then(function (created) {
        console.log('Does the database have been created?: ', created);
    });
```

## Licence
MIT License