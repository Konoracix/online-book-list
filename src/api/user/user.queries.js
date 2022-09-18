const db = require('../../db');
const encoder = require('../../encoder');

async function findUserByMail(mail){
	const user = await db('user_list').where({mail: mail}).first();
	return user;
}

async function createUser(userData){
	await db('user_list').insert({
		mail: userData.mail,
		password: encoder(userData.password)
	});
}

module.exports = {findUserByMail, createUser};