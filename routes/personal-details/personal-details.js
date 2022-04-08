var express = require('express');
var router = express.Router();

module.exports = () => {
	
    const authentication = require('../authentication/authentication');
    router.use('/', async (req, res, next) =>
        authentication(req, res, next));

	const personalDetailsPost = require('./personal-details-post');
	router.post( '/', async (req, res, next) =>  
		await personalDetailsPost(req, res, next) );

	return router;
}