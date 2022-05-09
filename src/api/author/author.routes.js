const express = require('express');

const queries = require('./author.queries');

const router = express.Router();

const mailer = require('../../lib/mailUtils');

router.get('/', async (req, res) => {
	const authors = await queries.find();
	res.json(authors);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if(isNaN(id)){
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} 
		else{
			const authors = await queries.get(id);
			if(authors){
				return res.json(authors);
			}
			return next();
		}
	} catch (error) {
		next(error);
	}

});

router.put('/:id', async (req, res, next) => {
	const author = req.body;
	const { id } = req.params;
	try {
		if(typeof author.name === 'string' && typeof author.surname === 'string' && !isNaN(req.params.id)){
			const updatedUser = await queries.update(id, author);
			if(updatedUser){
				// mailer();
				console.log(updatedUser);
				res.json(updatedUser);		
			}
		}
		else {
			const error = new Error('Invalid data');
			res.status(400);
			throw error;
		}
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res) => {
	const createdAuthor = await queries.post(req.body);
	res.json(createdAuthor)
});

module.exports = router;