var express = require('express');
var router = express.Router();

module.exports = () => {
	const  googleRoute = require('./google/google');
	router.use('/google', googleRoute());

	const loginPost = require('./login-post');
	router.post( '/', async (req, res, next) =>  
		await loginPost(req, res, next) );
	
	return router;
}