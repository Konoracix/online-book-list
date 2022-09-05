const tableNames = require('../../src/constants/tableNames');
const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  var salt = bcrypt.genSaltSync(12);
  await knex(tableNames.location).del()
  await knex(tableNames.userList).del()
  await knex(tableNames.location).insert([
    {country: 'Poland', postcode: '44-122', city: 'Katowice', street: 'Zimorodka', street_number: '5', house_number: '2'}
  ]);
	await knex(tableNames.userList).insert([
		{name: 'Robert', surname: 'Makłowicz', address_id: 1, mail: 'radek.sdasda@poczta.fm', phone_number: 123456789, password: bcrypt.hashSync('myPlaintextPassword', salt)}
	]);
  console.log(bcrypt.hashSync('myPlaintextPassword', "$2b$12$azy2qqDBi5u5p9fzVc0YeOFwK27gKpdi5uJsG00fhIN0t/n"))
};
