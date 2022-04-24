const bcrypt  = require('bcryptjs');

const { 
    accessTokenGenerator, 
    refreshTokenGenerator
} = require('../../../../functions/tokenGenerator');
const { users } = require('../../../../database/database');

const verificationPost = async ( req, res, next ) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await users.findOne({ 'email': email });
        // 1.
        if( user === null || !user.verifiedUser ){
            res.status(401).json({
                errorNo : 1,
                errorMessage : 'No such users exist'
            });
            return;
        }
        // 2.
        if( user.googleAccount ){
            res.status(401).json({
                errorNo : 2,
                errorMessage : 'Google Account'
            });
            return;
        }
        // 3.
        if( new Date(user.verificationCodeExpiryDate) < new Date()  ){
            res.status(401).json({
                errorNo : 3,
                errorMessage : 'Token Expired'
            });
            return;
        }
        // 4.
        if( ! await bcrypt.compare( String(verificationCode), user.hashedVerificationCode ) ){
            res.status(401).json({
                errorNo : 4,
                errorMessage : 'Invalid token'
            });
            return;
        }


        const accessToken  = accessTokenGenerator( email );
        const refreshToken = refreshTokenGenerator( email );
        await users.updateOne({'email':email},{
            'refreshToken':refreshToken
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
        res.status(200).json({});
        return;
    } catch(e){
        console.log(e);
        res.status(500).json({
            errorNo : 0,
            errorMessage : 'Internal server error'
        }); 
        return;
    }
};

module.exports = verificationPost;