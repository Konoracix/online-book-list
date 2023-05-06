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

async function getUserAdress(mail) {
	const user = await db('user_list').where({mail: mail}).first();
	const id = user.address_id;
	const address = await db('user_location').where({id: id}).first();
	return address;
}

module.exports = {findUserByMail, createUser, getUserAdress};