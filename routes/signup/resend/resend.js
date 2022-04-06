var express = require('express');
var router = express.Router();

module.exports = () => {
	router.get('/', (req, res) => {
    	res.json({name:'resend'});
	});
	return router;
}