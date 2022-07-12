const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const { default: knex } = require('knex');

module.exports = {
	find() {
		return db(tableNames.authorList);
	},
	async exists(id) {
		const authorQuantity = await db(tableNames.authorList).count(id);
		return authorQuantity >= 1;
	},
	async get(id) {
		const author = await db(tableNames.authorList)
		.select('*')
		.where({
			id
		}).first();
		return author;
	},
	async update(id, author){
		return await db(tableNames.authorList)
			.where({
				id: id,
			})
			.update({
				name: author.name,
				surname: author.surname
			})
			.returning('*');
	},
	async post(body){
		const createdAuthor = await db(tableNames.authorList)
			.returning('*')
			.insert(body);
		return createdAuthor;
	}
};