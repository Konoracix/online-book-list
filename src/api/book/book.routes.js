const express = require('express');

const queries = require('./book.queries');

const router = express.Router();

const mailer = require('../../lib/mailUtils')

const author = require('../author/author.queries');
const { del } = require('../../db');

const validator = require('./book.validator');

router.get('/', async (req, res) => {
	const filterQueries = {
		limit: req.query.limit ?? 10,
		currentPage: req.query.current_page ?? 1,
		isDeleted: req.query.is_deleted ? req.query.is_deleted.toString() : "false",
		dateFrom: req.query.date_from,
		dateTo:	req.query.date_to
	}

	const books = await queries.getAll(filterQueries);
	res.json({
		current_page: parseInt(filterQueries.currentPage),
		limit: parseInt(filterQueries.limit),
		total_pages: Math.ceil(await queries.count(filterQueries.isDeleted) / filterQueries.limit),
		data: books
	});
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
	const result = validator(req.body);
	console.log(result);
	if (result != true) {
		res.status(400);
		res.json(result);
		return;
	} 
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