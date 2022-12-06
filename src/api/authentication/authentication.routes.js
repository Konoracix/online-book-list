const express = require('express');
const db = require('../../db');
const router = express.Router();
const userQueries = require('../user/user.queries');
var is = require( 'validator.js' ).Assert;
const validator = require('validator.js').validator();
const bcrypt = require('bcrypt');
var crypto = require("crypto");
const queries = require('./authentication.queries');
const jwt = require('jsonwebtoken');

router.post('/create', async (req, res) => {
	
});

function addHours(numOfHours, date = new Date()) {
	date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
	return date;
}

router.get('/encodeUser/:token', async (req, res) => {
	let encodedUser = await jwt.verify(req.params.token, 'sdkljaslkjdkasjdf');
	console.log(encodedUser);
	res.json({
		mail: encodedUser.mail,
		expire_date: encodedUser.expire_date,
	})
})

router.put('/logout', async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	await queries.updateTokenExpirationDate(token)
	res.status(200).json({})
})

router.get('/checkExpirationStatus/:token', async (req, res) => {
	let expirationStatus = false;
	let token = req.params.token;
	let expirationDate = await queries.getAccessTokenData(token).expire_date;

	if(expirationDate < new Date()) expirationStatus = true;

	res.json({
		token: token,
		expirationStatus: expirationStatus,
	});
})

router.post('/login', async (req, res) => {
	const user = await userQueries.findUserByMail(req.body.mail);
	if(!user) {
		res.status(200).json({
			message: 'invalid email'
		});
		return;
	}
	const match = await bcrypt.compare(req.body.password, user.password);
	console.log(match);
	if(!match) {
		console.log(match);
		res.status(200).json({
			message: 'invalid password'
		})
		return;
	}

	var expirationTime = addHours(1);

	var jsonToken = {
		mail: req.body.mail,
		expire_date: expirationTime
	}

	var accessToken = {
		token: await jwt.sign(jsonToken, 'sdkljaslkjdkasjdf'),
		expire_date: expirationTime,
		user: user.id
	}
	await db('access_token').insert(accessToken);
	res.status(201).json({
		message: accessToken
	})
});

router.post('/signup', async (req, res) => {
	var constraint = {
		mail: is.email(),
		password: [is.notBlank(), is.ofLength( { min : 5 })]
	}

	if(validator.validate(req.body, constraint) != true) {
		res.status(400).json({
			message: validator.validate(req.body, constraint)
		});	
		return;
	}

	const user = await userQueries.findUserByMail(req.body.mail);
	
	
	console.log(user);
	if(user){
		code = 400;
		message = "That mail is already used"
	}
	else{
		await userQueries.createUser(req.body);
		var code = 201;
		var message = "User was created";
	}
	res.status(code).json({
		message: message
	});	
	
});

module.exports = router;