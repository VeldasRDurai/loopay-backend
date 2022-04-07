var express = require('express');
var router = express.Router();

module.exports = () => {
	const  verificationRoute = require('./verification/verification');
	router.use('/verification', verificationRoute());

	const  resendRoute = require('./resend/resend');
	router.use('/resend', resendRoute());

	const  googleRoute = require('./google/google');
	router.use('/google', googleRoute());

	// router.get('/', (req, res) => {
    // 	res.json({name:'signup'});
	// });

	const signupPost = require('./signup-post');
	router.post( '/', async (req, res, next) =>  
		await signupPost(req, res, next) );

	return router;
}