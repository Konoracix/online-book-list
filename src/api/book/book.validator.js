const yup = require('yup');

function validateId(id){
	return Number.isInteger(parseFloat(id)) && id <= 2147483647;
}

async function validateCreatedBook(book) {
		let bookSchema = yup.object({
			title: yup.string().required(),
			author_id: yup.number().required().positive().integer(),
		})
		try {
			const result = await bookSchema.validate(book);
			return true;
		} catch (error) {
			return false;
		}
}

async function validateEditedBook(book) {
	let bookSchema = yup.object({
		title: yup.string(),
		author_id: yup.number().positive().integer(),
		deleted_at: yup.date().nullable()
	})
	try {
		const result = await bookSchema.validate(book);
		return true;
	} catch (error) {
		return false;
	}
}

module.exports = {validateCreatedBook, validateId, validateEditedBook};