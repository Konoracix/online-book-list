const express = require('express');
const router = express.Router();

const authors = require('./author/author.routes');
const books = require('./book/book.routes')
const auth = require('./authentication/authentication.routes');
const user = require('./user/user.routes')

router.get('/', (req, res) => {
	res.json({
		message: '📚 Book list API 📚' 
	});
});

router.use('/author', authors);
router.use('/user', user);
router.use('/book', books);
router.use('/auth', auth)

module.exports = router;