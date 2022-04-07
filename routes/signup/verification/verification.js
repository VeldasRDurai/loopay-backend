var express = require('express');
var router = express.Router();

module.exports = () => {
	const verificationPost = require('./verification-post');
	router.post( '/', async (req, res, next) =>  
		await verificationPost(req, res, next) );
	return router;
}