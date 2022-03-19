const tableNames = require('../../src/constants/tableNames')

exports.up = async (knex) => {
	await knex.schema.createTable(tableNames.authorList, (table) => {
		table.increments().notNullable();
		table.string('name', 50).collate('utf8_polish_ci').defaultTo(null);
		table.string('surname', 50).notNullable().collate('utf8_polish_ci');
	});
	
	await knex.schema.createTable(tableNames.bookList, (table) => {
		table.increments().notNullable();
		table.string('title', 255).collate('utf8_polish_ci').notNullable();
		table.integer('author_id').unsigned().references('id').inTable(tableNames.authorList).onDelete('cascade').notNullable();
		table.datetime('updated_at', false).notNullable();
		table.datetime('deleted_at', false).defaultTo(null);
	});
};

exports.down = async (knex) => {
	await knex.schema.dropTable(tableNames.bookList);
	await knex.schema.dropTable(tableNames.authorList);
};