const bcrypt  = require('bcryptjs');

const { users } = require('../../database/database');
const { 
    accessTokenGenerator, 
    refreshTokenGenerator
} = require('../../functions/tokenGenerator');

const loginPost = async ( req, res, next ) => {
    try{
        console.log('Login Post');
        const { email, password } = req.body;
        const user = await users.findOne({ 'email': email });
        if( user === null || !user.verifiedUser ){
            res.status(401).json({
                errorNo : 1,
                errorMessage : 'No such users exist'
            });
            return;
        }
        if( user.googleAccount ){
            res.status(401).json({
                errorNo : 2,
                errorMessage : 'Google Account'
            });
            return;
        }
        if( !await bcrypt.compare(password, user.hashedPassword )){
            res.status(401).json({
                errorNo : 3,
                errorMessage : 'Wrong password'
            });
            return;
        }

        const accessToken  = accessTokenGenerator( email );
        const refreshToken = refreshTokenGenerator( email );
        await users.updateOne({'email':email},{
            'refreshToken':refreshToken,
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
        res.status(200).json({
            email,
            gotPersonalDetails: user.gotPersonalDetails
        });
        return;
    } catch(e){
        console.log(e);
        res.status(500).json({
            errorNo : 0,
            errorMessage : 'Internal server error'
        }); 
        return;
    }
}

module.exports = loginPost;