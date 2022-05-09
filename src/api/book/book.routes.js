const express = require('express');

const queries = require('./book.queries');

const router = express.Router();

router.get('/', async (req, res) => {
	const books = await queries.getAll();
	res.json(books);
})

router.get('/:id', async (req, res) => {
	const book = await queries.getOne(req.params.id);
	res.json(book);
})

router.put('/:id', async (req, res) => {
	const book = await queries.putOne(req.params.id, req.body);
	res.json(book);
})

// router.post('/', async () => {
// 	try {
// 		const book = await Book
// 			.query()
// 			.insert(req.body);
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// })

module.exports = router;