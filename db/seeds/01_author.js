require('dotenv').config({path: '../../.env'});
const orderedTableNames = require('../../src/constants/ordaredTableNames');
const tableNames = require('../../src/constants/tableNames');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

	orderedTableNames.map(async(element) => {
	console.log("Clearing", element);
	await knex(element).del();
	});
	
	const author = {
		name: 'wojciech',
		surname: 'drewniak'
	}

	const createdAuthor = await knex(tableNames.authorList)
		.insert(author)
		.returning('*');
	console.log('Author created:', createdAuthor);
};
