var express = require('express');
var router = express.Router();


module.exports = () => {

    const authentication = require('../authentication/authentication');
    router.use('/', async (req, res, next) =>
        authentication(req, res, next));

    const rootGet = require('./root-get');
	router.get( '/', async (req, res, next) =>  
		await rootGet(req, res, next) );

	return router;
}