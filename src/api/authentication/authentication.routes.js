const express = require('express');
const db = require('../../db');
const router = express.Router();
const userQueries = require('../user/user.queries');

router.post('/create', async (req, res) => {
	
});

router.post('/signup', async (req, res) => {
	const user = await userQueries.findUserByMail(req.body.mail);
	var code = 201;
	var message = "User was created";
	console.log(user);
	if(user){
		code = 400;
		message = "That mail is already used"
	}
	else{
		await userQueries.createUser(req.body);
	}
	res.status(code).json({
		message: message
	});	
	
});

module.exports = router;