var express = require('express');
var router = express.Router();

module.exports = () => {
	const  usernameRoute = require('./username/username');
	router.use('/username', usernameRoute());

	const  passwordRoute = require('./password/password');
	router.use('/password', passwordRoute());

	return router;
}