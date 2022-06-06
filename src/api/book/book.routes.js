const express = require('express');

const queries = require('./book.queries');

const router = express.Router();

const mailer = require('../../lib/mailUtils')

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
	sendMail(createdBook);
	res.json(createdBook);
})



module.exports = router;