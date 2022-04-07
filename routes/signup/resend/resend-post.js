const bcrypt  = require('bcryptjs');

const { users } = require('../../../database/database');
const { nMinutesLater } = require('../../../functions/nTimeLater');
const sendMail = require('../../../functions/sendMail');

const resendPost = async ( req, res, next ) => {
    try{
        const { email } = req.body;
        const user = await users.findOne({ 'email': email });
		// 1.
		if( user !== null ){
			res.status(401).send("No such users");
			return;
		}
		// 2.
		if( user.verifiedUser ){
			res.status(401).send("EMAIL ALREADY EXIST");
			return;
		}
		// 3.
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

module.exports = resendPost;