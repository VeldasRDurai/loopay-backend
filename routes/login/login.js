var express = require('express');
var router = express.Router();

module.exports = () => {
	const  googleRoute = require('./google/google');
	router.use('/google', googleRoute());

	router.get('/', (req, res) => {
    	res.json({name:'login'});
	});
	return router;
}