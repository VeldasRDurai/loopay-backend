// const q = require('q');
const webPush = require('web-push');

const { users } = require('../database/database');

const pushNotification = async ({ email, payload }) => {
    // const payload = {
    //     title: `New message from ${ email }`,
    //     message: `${name} : ${message}` ,
    //     url: process.env.FRONTEND_DEVELOPMENT_URL,
    //     ttl: 36000,
    //     icon: picture,
    //     image: picture
    // };
    try{
        const user = await users.findOne({ 'email': email });
        if( user.subscription.endpoint === '' ) return;
        const pushSubscription = {
            endpoint: user.subscription.endpoint,
            keys: { 
                p256dh: user.subscription.keys.p256dh, 
                auth: user.subscription.keys.auth 
            }
        };
        const pushPayload = JSON.stringify(payload);
        const pushOptions = {
            vapidDetails: {
                subject: "https://github.com/VeldasRDurai",
                privateKey: process.env.VAPID_PRIVATE_KEY,
                publicKey: process.env.VAPID_PUBLIC_KEY
            },
            TTL: payload.ttl,
            headers: {}
        };
        webPush.sendNotification( pushSubscription, pushPayload, pushOptions);
    } catch(e){
        console.log(e)
    }
}

module.exports = { pushNotification }