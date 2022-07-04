const express = require('express');
const router = express.Router();

const authors = require('./author/author.routes');
const books = require('./book/book.routes')
const auth = require('./auth/auth.routes');

router.get('/', (req, res) => {
	res.json({
		message: '📚 Book list API 📚' 
	});
});

router.use('/author', authors);
router.use('/book', books);

module.exports = router;