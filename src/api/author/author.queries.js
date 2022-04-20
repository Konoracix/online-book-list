const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const { table } = require('../../db');

module.exports = {
	find() {
		return db(tableNames.authorList);
	},
	async get(id) {
		return await db(tableNames.authorList)
		.select('*')
		.where({
			id
		}).first(); 
	}
};