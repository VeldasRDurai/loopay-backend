const jwt = require('jsonwebtoken');

const tokenRefresher = require('./tokenRefresher');
const { users } = require('../../database/database');

const authentication = async (req, res, next) => {
    try{
        // console.log('1');
        if (!req.cookies['accessToken']){
            throw {
                name : 'NoAccessToken'
            }
        }
        // console.log('2');
        const { email } = await jwt.verify( 
            req.cookies['accessToken'], process.env.ACCESS_TOKEN_SECRET );
        const user = await users.findOne({ 'email': email });
        
        // console.log('3');
        if( !user.verifiedUser ){
            res.status(401).send("NOT A VERIFIED USER"); 
            return;
        }
        // console.log('4');
        req.email = email;
        // console.log('5');
        next();
        // console.log('6');
    } catch(error) {
        // console.log('7');
        if( error.name === 'JsonWebTokenError' ){
            // console.log('8');
            res.status(401).send("Unautherized access"); 
            return;
        }
        if( error.name === 'TokenExpiredError' || 
            error.name === 'NoAccessToken' ){
            // console.log('9');
            await tokenRefresher(req, res, next)
            return;
        }
        // console.log('11');
        console.log(error);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = authentication;