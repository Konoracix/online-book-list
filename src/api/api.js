const express = require('express');
const router = express.Router();

const authors = require('./author/author.routes');

router.get('/', (req, res) => {
	res.json({
		message: '📚 Book list API 📚' 
	});
});

router.use('/author', authors);

module.exports = router;