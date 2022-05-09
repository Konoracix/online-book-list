const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const tableUtils = require('../../lib/tableUtils');

module.exports = {
	async getAll(){
		return await db(tableNames.bookList);
	},
	async getOne(id){
		return await db(tableNames.bookList)
			.where({
				id,
				deleted_at: null
			})
			.first();
	},
	async putOne(id, book){
		const updatedBook = await db(tableNames.bookList)
			.where({
				id
			})
			.update({
				title: book.title,
				author_id: book.author_id,
				updated_at: tableUtils.getDate()
			})
			.returning('*');
		return updatedBook;
	}
}

