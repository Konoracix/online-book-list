const db = require('../../db');
const tableNames = require('../../constants/tableNames');

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
		console.log(createdAuthor);
		return createdAuthor;
	}
};