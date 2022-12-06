const db = require('../../db');
const tableNames = require('../../constants/tableNames');

function getAccessTokenData(token){
	return db(tableNames.accessToken).where({token: token}).first();
}

async function updateTokenExpirationDate(token){
	await db(tableNames.accessToken).where({token: token}).update({expire_date: new Date()})
}

module.exports = {getAccessTokenData, updateTokenExpirationDate}