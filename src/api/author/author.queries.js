const db = require('../../db');
const tableNames = require('../../constants/tableNames')

module.exports = {
	find() {
		return db(tableNames.authorList);
	},
};