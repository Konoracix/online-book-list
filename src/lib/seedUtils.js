const faker = require('faker');

function getAuthor(){
	const author = {
		name: faker.name.firstName(),
		surname: faker.name.lastName()	
	}
	return author;
}

module.exports = {
	getAuthor
}