const tableNames = require('../../src/constants/tableNames');
const { getDate } = require('../../src/lib/tableUtils');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const authorId = await knex(tableNames.authorList)
		.where({
			name: 'wojciech',
			surname: 'drewniak'
		})
		.first();
  const book = {
		title: 'historia bez cenzury 5',
		author_id: authorId.id,
		updated_at: getDate()
	};
	const addedBook = await knex(tableNames.bookList)
		.insert(book)
		.returning('*');
	console.log('Book created:', addedBook);
};
