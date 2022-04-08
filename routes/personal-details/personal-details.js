var express = require('express');
var router = express.Router();

module.exports = () => {
	
	const personalDetailsPost = require('./personal-details-post');
	router.post( '/', async (req, res, next) =>  
		await personalDetailsPost(req, res, next) );

	return router;
}