const { users } = require('../../../database/database');
const forgotUsernameMail = require('../../../functions/mail/forgotUsernameMail');

const usernamePost = async ( req, res, next ) => {
    try{
        const { email } = req.body;
        const user = await users.findOne({ 'email': email });
        // 1.
        if( user === null || !user.verifiedUser ){
            res.status(401).send("No such email address");
            return;
        }
        // 2.
        if( user.googleAccount ){
            res.status(401).send("Google Account");
            return;
        }
        // 3.
        if( !await forgotUsernameMail({email, username:user.username}) ){
            res.status(500).send("Not able to send email.Internal server error");
            return;
        }
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = usernamePost;