const validator = require('validator.js').validator();
const is = require( 'validator.js' ).Assert;

const { contentSecurityPolicy } = require('helmet');
const authorQueries = require('../author/author.queries')

const Assert = require('validator.js').Assert;





function validateBook(book) {
    console.log(Number.isInteger(5));
    const isExtended = Assert.extend({
        integer: Number.isInteger
        // exists: authorQueries.exists
    });

    console.log(isExtended);

    const constraint = {
        title: is.notBlank(),
        // author_id: [isExtended.integer(), isExtended.exists()]
    }

    console.log(book);
    console.log(constraint);
    return validator.validate(book, constraint);
}

module.exports = validateBook;