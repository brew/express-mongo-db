'use strict';

const test = require('tap').test;
const expressMongoDb = require('./');

test('throws on invalid uri', function (t) {
	t.throws(function () {
		expressMongoDb();
	}, /Expected uri to be a string/);
	t.end();
});

test('middleware pass error on fail', async function (t) {
	const middleware = await expressMongoDb('mongodb://localhost:31337');

	return middleware({}, {}, {})
		.then(() => {
			t.fail('Did not throw error');
        })
		.catch((err) => {
			t.ok(err);
			t.end();
        });
});

test('middleware stores connection to mongodb', async function (t) {
    const middleware = await expressMongoDb('mongodb://localhost:27017');
    const req = {};

    return middleware(req, {}, function (err) {
        t.error(err);
        t.ok(req.db);
    });
});

test('middleware stores connection in custom property', async function (t) {
	const middleware = await expressMongoDb('mongodb://localhost:27017', 'myDb', {
		property: 'myDb'
	});

	const req = {};

	return middleware(req, {}, function (err) {
		t.error(err);
		t.ok(req.myDb);
	});
});

test('returns same connection for multiple requests', async function (t) {
	const middleware = await expressMongoDb('mongodb://localhost:27017', 'myDb', {
		property: 'myDb'
	});

	const req = {};
	let _db = '';

	return middleware(req, {}, function (err) {
		t.error(err);
		t.ok(req.myDb);
		_db = req.myDb;

		return middleware(req, {}, function (err) {
			t.error(err);
			t.equal(_db, req.myDb);
		});
	});
});
