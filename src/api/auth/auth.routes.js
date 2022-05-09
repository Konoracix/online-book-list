const express = require('express');

const router = express.Router();

router.post('/signup', (req, res, next) => {
	res.json({
		message: req.body.message
	});
});

router.post('/signin', (req, res, next) => {

});

module.exports = router;