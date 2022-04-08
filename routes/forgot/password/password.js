var express = require('express');
var router = express.Router();

module.exports = () => {
	const  verificationRoute = require('./verifictaion/verification');
	router.use('/verification', verificationRoute());

	const passwordPost = require('./password-post');
	router.post( '/', async (req, res, next) =>  
		await passwordPost(req, res, next) );
	return router;
}