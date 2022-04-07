var express = require('express');
var router = express.Router();

module.exports = () => {
	const resendPost = require('./resend-post');
	router.post( '/', async (req, res, next) =>  
		await resendPost(req, res, next) );
	return router;
}