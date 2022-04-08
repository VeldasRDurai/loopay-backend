const jwt = require('jsonwebtoken');

const { users } = require('../../database/database');
const {
    accessTokenGenerator,
    refreshTokenGenerator
} = require('../../functions/tokenGenerator');

const tokenRefresher = async (req, res, next) => {
    try{
        // console.log('10');
        if (!req.cookies['refreshToken']){
            // console.log('101');
            res.status(401).send("NO REFRESH TOKEN"); 
            return;
        }
        // console.log('102');
        const { email } = await jwt.verify( 
            req.cookies['refreshToken'], process.env.REFRESH_TOKEN_SECRET);
        const user = await users.findOne({ 'email': email });

        if( !user.verifiedUser ){
            // console.log('103');
            res.status(401).send("NOT A VERIFIED USER"); 
            return;
        }
        if( user.refreshToken !== req.cookies['refreshToken'] ){
            // console.log('104');
            res.status(401).send("REFRESH TOKEN IS NOT MATCHING WITH DATABASE"); 
            return;
        }
        // console.log('105');
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
        req.email = email;
        next();
    } catch(error){
        console.log(error);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = tokenRefresher;