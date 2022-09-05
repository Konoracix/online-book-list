require('dotenv').config({path: '../../.env'});
const orderedTableNames = require('../../src/constants/ordaredTableNames');
const tableNames = require('../../src/constants/tableNames');
const { getAuthor } = require('../../src/lib/seedUtils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

	orderedTableNames.map(async(element) => {
	console.log("Clearing", element);
	await knex(element).del();
	});
	
	for(let i = 0; i < 25; i++){
		const createdAuthor = await knex(tableNames.authorList)
		.insert(getAuthor())
		.returning('*');
		// console.log('Author created:', createdAuthor);
	}
};
