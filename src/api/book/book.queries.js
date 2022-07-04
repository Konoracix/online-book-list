const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const tableUtils = require('../../lib/tableUtils');

module.exports = {
	async getAll(queries){
		const data = db(tableNames.bookList).where(builder => {
			console.log(queries)
			if(queries.isDeleted == "false"){
				builder.andWhere("deleted_at", null);
			}if(queries.dateTo){
				builder.andWhere("created_at", "<", queries.dateTo)
			}if(queries.dateFrom){
				builder.andWhere("created_at", ">", queries.dateFrom)
			}
		})
		.limit(queries.limit)
		.offset((queries.currentPage-1)*queries.limit)
		.select('*')
		return data;
		// return is_deleted=="false" ?
		// 	await db(tableNames.bookList)
		// 	.where({
		// 		deleted_at: null
		// 	}).limit(limit)
		// 	.offset((currentPage-1)*limit)
		// 	: await db(tableNames.bookList)
			
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
				created_at: tableUtils.getDate(),
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
	},
	async count(is_deleted = "false"){
		const count = is_deleted == "false" ? await db(tableNames.bookList).where({deleted_at: null}).count() : await db(tableNames.bookList).count()
		return count[0].count;
	}
}

