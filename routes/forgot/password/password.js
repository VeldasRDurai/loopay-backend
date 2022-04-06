var express = require('express');
var router = express.Router();

module.exports = () => {
	const  verificationRoute = require('./verifictaion/verification');
	router.use('/verification', verificationRoute());

	router.get('/', (req, res) => {
    	res.json({name:'verification'});
	});
	return router;
}