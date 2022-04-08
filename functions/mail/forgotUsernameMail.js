const sendMail = require('./sendMail');

const forgotUsernameMail = async ({email,username}) => {
    const mailOptions = {
        from: `Loopay Application ${process.env.EMAIL}` ,
        to  :  email , 
        subject: "Your username" ,
        text: `Your username of Loopay Application is : ${username}` 
    }
    return sendMail(mailOptions);
}

module.exports = forgotUsernameMail;