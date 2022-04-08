const bcrypt  = require('bcryptjs');

const { users } = require('../../../database/database');
const { nMinutesLater } = require('../../../functions/nTimeLater');
const userVerificationMail = require('../../../functions/mail/userVerificationMail');

const passwordPost = async ( req, res, next ) => {
    try{
        console.log('Login Post');
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
        const verificationCode  = Math.floor( (Math.random() * 999999) + 1 );
        if( !await userVerificationMail({email,verificationCode}) ){
            res.status(500).send("Not able to send email.Internal server error");
            return;
        }
        // 4.
        const hashedVerificationCode = 
            await bcrypt.hash( verificationCode.toString(), 10 );
        await users.updateOne({ 'email':email },{
            'hashedVerificationCode':hashedVerificationCode,
            'verificationCodeExpiryDate': nMinutesLater(5)
        });
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = passwordPost;