var createError = require('http-errors');
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

	const rootRouter = require('./root/root');
	router.get('/', rootRouter());

	router.use( (req, res, next) => {
		res.status(404).send();
	}); 
	router.use((err, req, res, next) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
	});

	return router;
}