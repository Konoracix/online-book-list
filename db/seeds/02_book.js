const tableNames = require('../../src/constants/tableNames');
const { getDate } = require('../../src/lib/tableUtils');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	const authors = await knex(tableNames.authorList);
	const booksToInsert = authors.map( author => {
		return {
			title: "historia bez cenzury 5",
			author_id: author.id,
			created_at: getDate(),
			updated_at: getDate(),
		};
	});
	const books = await knex(tableNames.bookList).insert(booksToInsert).returning("*");
	console.log(books);
};
