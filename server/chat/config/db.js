"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

class Db {

	constructor() {
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect() {
		const mongoURL = process.env.DB_URL;
		return new Promise((resolve, reject) => {
			this.mongoClient.connect(mongoURL, (err, db) => {
				console.log("Connected to mongo successfully ")
				if (err) {
					reject(err);
				} else {
					assert.strictEqual(null, err);
					resolve([db, this.ObjectID]);
				}
			});
		});
	}
}
module.exports = new Db();