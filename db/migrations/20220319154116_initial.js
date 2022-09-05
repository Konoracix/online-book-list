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
		table.datetime('created_at', { useTz: false }).notNullable();
		table.datetime('updated_at', { useTz: false }).notNullable();
		table.datetime('deleted_at', { useTz: false }).defaultTo(null);
	});

	await knex.schema.createTable(tableNames.location, (table) => {
		table.increments().notNullable();
		stringTable(table, 'country').notNullable();
		stringTable(table, 'postcode').notNullable();
		stringTable(table, 'city').notNullable();
		stringTable(table, 'street').notNullable();
		stringTable(table, 'street_number').notNullable();
		stringTable(table, 'house_number');
	})
	await knex.schema.createTable(tableNames.userList, (table) => {
		table.increments().notNullable();
		stringTable(table, 'name');
		stringTable(table, 'surname');
		references(table, tableNames.location, 'address_id');
		stringTable(table, 'mail');
		table.integer('phone_number');
		stringTable(table, 'password');
		
	})

	};



	

exports.down = async (knex) => {
	await knex.schema.dropTable(tableNames.bookList);
	await knex.schema.dropTable(tableNames.authorList);
	await knex.schema.dropTable(tableNames.userList);
	await knex.schema.dropTable(tableNames.location);
};