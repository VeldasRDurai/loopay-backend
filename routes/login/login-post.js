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
            res.status(401).send("No such email address");
            return;
        }
        if( user.googleAccount ){
            res.status(401).send("Google Account");
            return;
        }
        if( !await bcrypt.compare(password, user.hashedPassword )){
            res.status(401).send("Wrong Password");
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
            gotPersonalDetails: user.gotPersonalDetails
        });
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = loginPost;