var express = require('express');
var router = express.Router();

module.exports = () => {
	const googlePost = require('./google-post');
	router.post( '/', async (req, res, next) =>  
		await googlePost(req, res, next) );
	return router;
}