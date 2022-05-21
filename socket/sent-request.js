const mongoose = require("mongoose");
const { users, transactions } = require('../database/database');
const { REQUEST_SEND } = require('../database/requestStateTypes');

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
        if( requestToUser.isOnline ){
            socket.broadcast.to(requestToUser.socketId).
                emit('receive-request',{ requestFrom });
        } else {
            // PUSH NOTIFICTAION
        }

        const transactionNo = new mongoose.Types.ObjectId();
        await users.updateOne({'email': requestFrom},{
            "$push": { 
                'transactions'  : transactionNo
                // { 
                //     transactionNo,
                //     searchDetails,
                //     requestFrom, 
                //     requestTo, 
                //     requestTimerStartsOn, 
                //     requestTimerExpiesOn,
                //     requestState : REQUEST_SEND,
                // } 
            },
            'currentTransaction': transactionNo
        });
        await users.updateOne({'email': requestTo},{
            "$push": { 
                'transactions'  : transactionNo
                // { 
                    // transactionNo,
                    // searchDetails,
                    // requestFrom, 
                    // requestTo, 
                    // requestTimerStartsOn, 
                    // requestTimerExpiesOn,
                    // requestState : REQUEST_SEND,
                // } 
            },
            'currentTransaction': transactionNo
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
    } catch(e){
        console.log(e);
    }
}

module.exports = sendRequest;