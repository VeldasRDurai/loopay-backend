var express = require('express');
var router = express.Router();


module.exports = () => {
    
    const authentication = require('../authentication/authentication');
    router.use('/', async (req, res, next) =>
    authentication(req, res, next));
    
    router.get( '/', async (req, res, next) => {
        try {
            res.clearCookie( "accessToken");
            res.clearCookie( "refreshToken");
            res.send('success');
        } catch (e){ res.status(500).send(e); }    
    });

	return router;
}