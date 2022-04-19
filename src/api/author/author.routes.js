const express = require('express');

const queries = require('./author.queries');

const router = express.Router();

router.get('/', async (req, res) => {
	const authors = await queries.find();
	res.json(authors);
});

module.exports = router;