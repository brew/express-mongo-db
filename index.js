const MongoClient = require('mongodb').MongoClient;

module.exports = function (uri, dbName, opts) {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string.');
	}

	opts = opts || {};
	const property = opts.property || 'db';
	delete opts.property;

	 let client;

	return async function expressMongoDb(req, res, next) {
		if (!client) {
			client = await MongoClient.connect(uri, opts);
		}

		try {
            req[property] = client.db(dbName);
            next();
		} catch (err) {
			client = undefined;
			next(err);
		}
    }
};
