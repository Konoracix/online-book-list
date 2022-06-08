const express = require('express');

const queries = require('./book.queries');

const router = express.Router();

const mailer = require('../../lib/mailUtils')

const author = require('../author/author.queries');

router.get('/', async (req, res) => {
	const books = await queries.getAll();
	res.json(books);
})

router.get('/mail', async (req, res) => {
	res.json(await mailer.sendMail());
})

router.get('/:id', async (req, res) => {
	const book = await queries.getOne(req.params.id);
	res.json(book);
})

router.put('/:id', async (req, res) => {
	const book = await queries.putOne(req.params.id, req.body);
	res.json(book);
})

router.post('/', async (req, res) => {
	const createdBook = await queries.post(req.body);
	const createdBookAuthorData = await author.get(createdBook.author_id);
	mailer.sendMail(createdBook, createdBookAuthorData);
	res.json(createdBook);
})



module.exports = router;