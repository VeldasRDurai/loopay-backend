var express = require('express');
var router = express.Router();

module.exports = () => {

	const authenticationRoute  = require('../../../../authentication/authentication');
	router.use('/', authenticationRoute());

	const newPost = require('./new-post');
	router.post( '/', async (req, res, next) =>  
		await newPost(req, res, next) );
	return router;
}