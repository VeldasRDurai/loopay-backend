const jwt = require("jsonwebtoken");


const verify = require('../../../functions/googleVerification');
const { users } = require('../../../database/database');
const { 
    accessTokenGenerator, 
    refreshTokenGenerator
} = require('../../../functions/tokenGenerator');

const googlePost = async ( req, res, next ) => {
    try{
        const { token } = req.body;
        const { email } = await verify(token); 
        const user = await users.findOne({ 'email': email });
        // 1.
        if(user !== null ){
            res.status(401).send("EMAIL ALREADY EXIST");
            return;
        }

        const accessToken  = accessTokenGenerator( email );
        const refreshToken = refreshTokenGenerator( email );

        await users({
            'email': email,
            'verifiedUser': true,
            'refreshToken': refreshToken,
            'googleAccount': true,
            'gotPersonalDetails': false
        }).save();
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
}

module.exports = googlePost;