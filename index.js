const MongoClient = require('mongodb').MongoClient;

module.exports = function (uri, dbName, opts) {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string.');
	}

	opts = opts || {};
	const clientProperty = opts.clientProperty || 'client';
	const dbProperty = opts.dbProperty || 'db';
	delete opts.clientProperty
	delete opts.dbProperty;

	let client;

	return async function expressMongoDb(req, res, next) {
		if (!client) {
			client = await MongoClient.connect(uri, opts);
		}

		try {
      req[dbProperty] = client.db(dbName);
      req[clientProperty] = client;
      next();
		} catch (err) {
			client = undefined;
			next(err);
		}
  }
};
