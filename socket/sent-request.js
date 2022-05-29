const mongoose = require("mongoose");
const { users, transactions } = require('../database/database');
const { REQUEST_SEND } = require('../database/requestStateTypes');
const { MAINPAGE_SEARCH_MODE } = require('../database/currentModeTypes');

const { pushNotification } = require('../functions/pushNotification');

const sendRequest = async ({ 
    requestFrom, 
    requestTo, 
    requestTimerStartsOn,
    requestTimerExpiesOn, 
    searchDetails,
    socket 
}) => {
    try{
        const requestToUser = await users.findOne({ 'email': requestTo });
        const transactionNo = new mongoose.Types.ObjectId();
        
        if( requestToUser.isOnline ){
            socket.broadcast.to(requestToUser.socketId).
                emit('receive-request',{ requestFrom, requestTimerExpiesOn });
        } else {
            // PUSH NOTIFICTAION
        }
    
        await users.updateOne({'email': requestFrom},{
            "$push": { 'transactions'  : transactionNo },
            'currentTransaction': transactionNo,
            'currentMode': MAINPAGE_SEARCH_MODE
        });
        await users.updateOne({'email': requestTo},{
            "$push": { 'transactions'  : transactionNo },
            'currentTransaction': transactionNo,
            // 'currentMode': MAINPAGE_SEARCH_MODE,
            'requestFrom': requestFrom,
            'requestFromUpto': requestTimerExpiesOn
        });

        console.log( REQUEST_SEND );
        await transactions({
            transactionNo,
            searchDetails,
            requestFrom, 
            requestTo, 
            requestTimerStartsOn, 
            requestTimerExpiesOn,
            requestState : REQUEST_SEND,
            requestStateOn : requestTimerStartsOn
        }).save();
        
        const payload = {
            title: `Request from ${ requestFrom }`,
            message: `You have a request from ${requestFrom} expires on ${requestTimerExpiesOn}`,
            url: process.env.FRONTEND_DEVELOPMENT_URL,
            ttl: 36000,
        };
        pushNotification({ email:requestTo, payload });
    
    } catch(e){
        console.log(e);
    }
}

module.exports = sendRequest;