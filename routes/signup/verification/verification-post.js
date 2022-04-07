const bcrypt  = require('bcryptjs');
const jwt     = require("jsonwebtoken");

const { 
    accessTokenGenerator, 
    refreshTokenGenerator
} = require('../../../functions/tokenGenerator');
const { users } = require('../../../database/database');

const verificationPost = async ( req, res, next ) => {
    try {
        const { email, otp } = req.body;
        const user = await users.findOne({ 'email': email });	
        // 1.
        if( user === null ){
            res.status(401).send("No such users");
            return;
        }
        // 2.
        if( user.verifiedUser ){
            res.status(401).send("EMAIL ALREADY EXIST");
            return;
        }
        // 3.
        if( new Date(user.verificationCodeExpiryDate) < new Date()  ){
            res.status(401).send("Token Expired");
            return;
        }
        // 4.
        if( ! await bcrypt.compare(otp, user.hashedVerificationCode ) ){
            res.status(401).send("Tokens are not same");
            return;
        }


        const accessToken  = accessTokenGenerator( email );
        const refreshToken = refreshTokenGenerator( email );
        // const accessToken  = jwt.sign({ email }, 
        //     process.env.ACCESS_TOKEN_SECRET, 
        //     { expiresIn:"15m" });
        // const refreshToken = jwt.sign({ email }, 
        //     process.env.REFRESH_TOKEN_SECRET );
        await users.updateOne({'email':email},{
            'verifiedUser':true,
            'refreshToken':refreshToken,
            'googleAccount':false,
            'gotPersonalDetails':false
        });
        res.cookie("accessToken", accessToken, { 
            path:"/",  
            httpOnly:true, 
            maxAge: 900000  
        });
        res.cookie("refreshToken", refreshToken, {
            path:"/",  
            httpOnly:true 
        });
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
};

module.exports = verificationPost;