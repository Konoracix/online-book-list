const express = require('express');

const queries = require('./author.queries');

const router = express.Router();

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

module.exports = router;