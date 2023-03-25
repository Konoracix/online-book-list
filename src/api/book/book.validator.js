const validator = require('validator.js');
const is = require( 'validator.js' ).Assert;

// const { contentSecurityPolicy } = require('helmet');
// const { isTransaction } = require('../../db');
const authorQueries = require('../author/author.queries')

const Assert = require('validator.js').Assert;


function validateId(id){
	return isInteger(id);
}


function validateBook(book) {
	var constraint = validator.constraint( {
		title: is.notBlank(),
		author_id: is.Required()
	}, { strict: true });
	if(constraint.check(book) && isInteger(book.author_id)){
		return true
	} 
	return false;
}

function isInteger(number){
	return !isNaN(parseFloat(number));
}

module.exports = {validateBook, validateId};