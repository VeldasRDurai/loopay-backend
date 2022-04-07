var express = require('express');
var router = express.Router();

module.exports = () => {

	// const accessToken  = jwt.sign(
	//     { email } , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"15m"} );
	// const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET );
	// res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000  } );
	// res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );

	router.get('/', (req, res) => {
    	res.json({name:'verification'});
	});
	return router;
}