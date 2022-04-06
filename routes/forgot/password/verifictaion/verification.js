var express = require('express');
var router = express.Router();

module.exports = () => {

	router.get('/', (req, res) => {
    	res.json({name:'verification'});
	});
	return router;
}