var express = require('express');
var router = express.Router();


module.exports = () => {

    const authentication = require('../authentication/authentication');
    router.use('/', async (req, res, next) =>
        authentication(req, res, next));

    router.get('/', async (req, res, next) => {
        res.json({name:'Veldas R Durai', email:req.email});
    });

	return router;
}