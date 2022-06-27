const express = require('express');

const queries = require('./book.queries');

const router = express.Router();

const mailer = require('../../lib/mailUtils')

const author = require('../author/author.queries');
const { del } = require('../../db');

router.get('/', async (req, res) => {
	const books = req.query.is_deleted ? await queries.getAll(req.query.is_deleted.toString()) : await queries.getAll();
	res.json(books);
})

router.get('/mail', async (req, res) => {
	res.json(await mailer.sendMail());
})

router.get('/:id', async (req, res) => {
	const book = await queries.getOne(req.params.id);
	if(book == undefined) {
		res.status(404);
	}
	res.json(book);
})

router.put('/:id', async (req, res) => {
	const book = await queries.getOne(req.params.id);
	if(book == undefined) {
		res.status(404);
	}
	const updatedBook = await queries.putOne(req.params.id, req.body);
	res.json(updatedBook);
})

router.post('/', async (req, res) => {
	const createdBook = await queries.post(req.body);
	const createdBookAuthorData = await author.get(createdBook.author_id);
	mailer.sendMail(createdBook, createdBookAuthorData);
	res.json(createdBook);
})

router.delete('/:id', async (req, res) => {
	const book = await queries.getOne(req.params.id);
	if(book == undefined) {
		res.status(404);
	}
	const deletedBook = await queries.deleteOne(req.params.id);
	res.json(deletedBook);
})

module.exports = router;