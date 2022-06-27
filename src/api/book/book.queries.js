const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const tableUtils = require('../../lib/tableUtils');

module.exports = {
	async getAll(is_deleted = "false"){
		return is_deleted=="false" ?
			await db(tableNames.bookList)
			.where({
				deleted_at: null
			}) 
			: await db(tableNames.bookList);
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
				id,
				deleted_at: null
			})
			.update({...book,
				updated_at: new Date(),
				deleted_at: null
			})
			.returning('*');
		return updatedBook[0];
	},
	async post(body){
		const createdBook =  await db(tableNames.bookList)
			.insert({
				title: body.title,
				author_id: body.author_id,
				updated_at: tableUtils.getDate()
			})
			.returning('*');
			return createdBook[0];
	},
	async deleteOne(id){
		const deletedBook = await db(tableNames.bookList)
			.where({
				id,
				deleted_at: null
			})
			.update({
				updated_at: new Date(),
				deleted_at: new Date()
			})
			.returning('*');
		return deletedBook[0];
	}
}

