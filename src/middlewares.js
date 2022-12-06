const { contentSecurityPolicy } = require('helmet');
const jwt = require('jsonwebtoken');

require('dotenv').config();

function notFound(req, res, next){
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
}

function errorHandler(error, req, res, next) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		status: statusCode,  
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? '💩' : error.stack,
	});
}

function checkPublicEndpoints(url){
	let accessibleRoutes = [
		'/api/auth/login',
		'/api/auth/signup'
	]
	let isPublic = false;
	accessibleRoutes.forEach((element) => {
		if(url == element){
			isPublic = true;
		}
	})
	return isPublic;
}

function authenticateJWT(req, res, next){
	if(checkPublicEndpoints(req.url)){
		next()
		return
	}
	const authHeader = req.headers.authorization;
	
	if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, "sdkljaslkjdkasjdf", (err, user) => {
					if (err) {
							return res.sendStatus(403);
					}

					req.user = user;
					console.log(new Date(user.expire_date) > new Date())
					if(new Date(user.expire_date) > new Date()){
						next();
						return;
					}
					return res.sendStatus(403)
			});
	} else {
			res.sendStatus(401);
	}
};

module.exports = {
	notFound,
	errorHandler,
	authenticateJWT
}