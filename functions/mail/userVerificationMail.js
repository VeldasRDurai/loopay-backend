const sendMail = require('./sendMail');

const userVerificationMail = async ({email,verificationCode}) => {
    const mailOptions = {
        from: `Loopay Application ${process.env.EMAIL}` ,
        to  :  email , 
        subject: "User Verifictaion" ,
        text: `Your user verifiction code for Loopay Application is : ${verificationCode}` 
    }
    return sendMail(mailOptions);
}

module.exports = userVerificationMail;