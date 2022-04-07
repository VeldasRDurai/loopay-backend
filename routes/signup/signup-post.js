//1. https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81

const bcrypt  = require('bcryptjs');

const { users } = require('../../database/database');
const { nMinutesLater } = require('../../functions/nTimeLater');
const sendMail = require('./sendMail');

const signupPost = async ( req, res, next ) => {
    try{
        const { email, password } = req.body;
        const user = await users.findOne({ 'email': email });
        console.log("users : " + user );
        console.log(req.body);
        // 1.
        // There is user with the given mail id and
        // that user has verified his mail id
        if( user !== null && !user.verifiedUser ){
            console.log( new Date(user.hashedVerificationCodeExpiryDate) );
            res.status(401).send("EMAIL ALREADY EXIST");
            return;
        }
        // 2.
        // Sending verification code to given mail id and
        // May of may not able to send error
        const {
            messageSent,
            error,
            verificationCode
        } = await sendMail( email );
        if( !messageSent ){
            console.log( error );
            res.status(500).send("Not able to send email.Internal server error");
            return;
        }
        // 3.
        // Hashing Password and Verification code
        // Saving everything in database
        const hashedPassword = await bcrypt.hash( password, 10 );
        const hashedVerificationCode = 
            await bcrypt.hash( verificationCode.toString(), 10 );
        await users({
            email,
            hashedPassword,
            verifiedUser:false,
            hashedVerificationCode,
            hashedVerificationCodeExpiryDate: nMinutesLater(5)
        }).save();
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = signupPost;