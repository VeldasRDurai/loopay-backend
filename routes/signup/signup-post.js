//1. https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81

const bcrypt  = require('bcryptjs');

const { users } = require('../../database/database');
const { nMinutesLater } = require('../../functions/nTimeLater');
const userVerificationMail = require('../../functions/mail/userVerificationMail');

const signupPost = async ( req, res, next ) => {
    try{
        const { email, password } = req.body;
        const user = await users.findOne({ 'email': email });
        // 1.
        // There is user with the given mail id and
        // that user has verified his mail id
        if( user !== null && user.verifiedUser ){
            res.status(401).json({
                errorNo : 1,
                errorMessage : 'Email Already Exist'
            });
            return;
        }

        // 2.
        // Sending verification code to given mail id and
        // May of may not able to send error
        const verificationCode  = Math.floor( (Math.random() * 999999) + 1 );
        if( !await userVerificationMail({email,verificationCode}) ){
            res.status(500).json({
                errorNo : 2,
                errorMessage : 'Not able to send email'
            });
            return;
        }


        // 3.
        // Hashing Password and Verification code
        // Saving everything in database
        const hashedPassword = await bcrypt.hash( password, 10 );
        const hashedVerificationCode = 
            await bcrypt.hash( verificationCode.toString(), 10 );

        // if cond:1 fails it means that
            // a. There is no such user with this ${email} id or => create new document
            // b. There is a non verified user => update the document
        if( user === null ){
            await users({
                'email':email,
                'hashedPassword':hashedPassword,
                'verifiedUser':false,
                'hashedVerificationCode':hashedVerificationCode,
                'verificationCodeExpiryDate': nMinutesLater(5)
            }).save();
        } else {
            console.log('update');
            await users.updateOne({'email':email},{
                'hashedPassword':hashedPassword,
                'verifiedUser':false,
                'hashedVerificationCode':hashedVerificationCode,
                'verificationCodeExpiryDate': nMinutesLater(5)
            });
        }
        res.status(200).json({
            email
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

module.exports = signupPost;