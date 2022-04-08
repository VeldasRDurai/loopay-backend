var express = require('express');
var router = express.Router();

module.exports = () => {

	const authentication = require('../authentication/authentication');
    router.use('/', async (req, res, next) =>
        authentication(req, res, next));

	const searchPost = require('./search-post');
	router.post( '/', async (req, res, next) =>  
		await searchPost(req, res, next) );

	return router;
}