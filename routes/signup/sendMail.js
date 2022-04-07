//1. https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
//2. https://developers.google.com/oauthplayground/
//3. https://console.cloud.google.com/apis/credentials

const nodemailer = require("nodemailer");
const { google } = require('googleapis');


const oAuth2Client = new google.auth.OAuth2( 
    process.env.CLIENT_ID, 
    process.env.CLIENT_SECRET, 
    process.env.REDIRECT_URI 
);
oAuth2Client.setCredentials( {
    refresh_token: process.env.REFRESH_TOKEN 
});


const sendMail = async ( toEmailAddress ) => {
    try {
        const verificationCode  = Math.floor( (Math.random() * 999999) + 1 );
        const googleAccessToken = await oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service: 'gmail' ,
            host: "smtp.gmail.com", 
            port: 465, 
            secure: false, 
            requiresAuth: true,
            auth: { 
                type: 'OAuth2',
                user: process.env.EMAIL ,
                clientId : process.env.CLIENT_ID ,
                clientSecret : process.env.CLIENT_SECRET ,
                refreshToken : process.env.REFRESH_TOKEN ,
                accessToken  : googleAccessToken
            },      
            tls:{
                rejectUnAuthorized:true
            }
        });
        let info = await transporter.sendMail({
            from: "Loopay Application " + process.env.EMAIL ,
            to  :  toEmailAddress , 
            subject: "User Verifictaion" ,
            text: "Your user verifiction code for Loopay Application is : " + verificationCode 
        });
        console.log("Message sent : ", info.messageId);

        return {
            messageSent : true,
            error: undefined,
            verificationCode
        }
    } catch(error) {
        console.log( "Message not sent : ",error );
        return {
            messageSent : false,
            error,
            verificationCode: undefined
        }
    }
}

module.exports = sendMail;