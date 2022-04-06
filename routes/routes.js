var express = require('express');
var router = express.Router();

module.exports = () => {
	const signupRoute = require('./signup/signup');
	router.use('/signup', signupRoute());

	const loginRoute = require('./login/login');
	router.use('/login', loginRoute());

	const searchRoute = require('./search/search');
	router.use('/search', searchRoute());

	const personalDetailsRoute = require('./personal-details/personal-details');
	router.use('/personal-details', personalDetailsRoute());

	// Authentication
	// router.use('/',)

	router.get('/', (req, res) => {
    	res.json({name:'Veldas R Durai'});
	});
	return router;
}