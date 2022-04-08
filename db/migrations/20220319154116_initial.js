const { knex } = require('knex');
const tableNames = require('../../src/constants/tableNames')
const { stringTable, references } = require('../../src/lib/tableUtils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.up = async (knex) => {
	await knex.schema.createTable(tableNames.authorList, (table) => {
		table.increments().notNullable();
		stringTable(table, 'name', 50).defaultTo(null);
		stringTable(table, 'surname', 50).notNullable();
	});
	
	await knex.schema.createTable(tableNames.bookList, (table) => {
		table.increments().notNullable();
		stringTable(table, 'title').notNullable();
		references(table, tableNames.authorList, 'author_id');
		table.datetime('updated_at', { useTz: false }).notNullable();
		table.datetime('deleted_at', { useTz: false }).defaultTo(null);
	});

	await knex.schema.createTable()
};

exports.down = async (knex) => {
	await knex.schema.dropTable(tableNames.bookList);
	await knex.schema.dropTable(tableNames.authorList);
};