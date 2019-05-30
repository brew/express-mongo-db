***Updated for MongoDB V4.X.X***

# express-mongo-db

> Get the MongoDB connection in the request in Express.


## Install

```
$ npm install --save https://github.com/brew/express-mongo-db
```


## Usage

```js
var app = require('express')();

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://localhost'), 'databaseName');

app.get('/', function (req, res, next) {
	req.db  // Db object
  req.client  // Client object
});
```

## API

### expressMongoDb(uri, databaseName, [options])

#### uri

*Required*
Type: `string`

This is simply the URL for the Mongo connection, minus the database name.  The MongoClient connection changed in MongoDB V3, where it now returns the client instead of the DB.

### databaseName

*Required*
Type: `string`

The name of the database that we are trying to connect to.

#### options

All options from [MongoClient](http://mongodb.github.io/node-mongodb-native/2.0/api/MongoClient.html) are accepted as well.

##### dbProperty

Type: `String`
Default: `db`

Property on `request` object in which db connection will be stored.

##### clientProperty

Type: `String`
Default: `client`

Property on `request` object in which client will be stored.

## Updated License

MIT © [Shane Jeffery](http://github.com/1RM)

## Original License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
