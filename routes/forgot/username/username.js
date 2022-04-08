var express = require('express');
var router = express.Router();

module.exports = () => {

	const usernamePost = require('./username-post');
	router.post( '/', async (req, res, next) =>  
		await usernamePost(req, res, next) );

	return router;
}