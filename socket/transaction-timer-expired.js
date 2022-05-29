const { users, transactions } = require('../database/database');

const { MAINPAGE_FEEDBACK_MODE } = require('../database/currentModeTypes');
const { TRANSACTION_TIME_EXPIRED_MODE } = require('../database/transactionResultTypes');
 
const transactionTimerExpire = async (
        { email, currentTransaction, socket }) => {
    try{
        console.log( 'transactionTimerExpire : ', { email, currentTransaction } );
        await transactions.updateOne({'transactionNo':currentTransaction},{
            'transactionActivated':false,
            'transactionEndTime':undefined,
            'transactionResult':TRANSACTION_TIME_EXPIRED_MODE,
            'transactionCanceledBy': email
        });
        const transaction = await transactions.findOne({ 'transactionNo' : currentTransaction });
        await users.updateOne({ 'email': transaction.requestFrom },{
            currentMode : MAINPAGE_FEEDBACK_MODE,
            lastSearchSaved : false,
            lastSearchUpto : undefined,
            requestFrom : undefined,
            requestFromUpto : undefined,
            transactionActivated : false,
            transactionEndTime: undefined,
        });
        await users.updateOne({ 'email': transaction.requestTo },{
            currentMode : MAINPAGE_FEEDBACK_MODE,
            lastSearchSaved : false,
            lastSearchUpto : undefined,
            requestFrom : undefined,
            requestFromUpto : undefined,
            transactionActivated : false,
            transactionEndTime: undefined,
        });

        const canceledUser = await users.findOne({ 'email': email });
        const nonCanceledUser = await users.findOne({ 
            'email': transaction.requestFrom !== email ?
                transaction.requestFrom : transaction.requestTo
        });

        socket.emit('transaction-timer-expired-acknowledge',{ 
            acknowledge:true, 
        });
        socket.broadcast.to(nonCanceledUser.socketId).
                emit('transaction-timer-expired-acknowledge',{ acknowledge:true });

        
        socket.emit('add-user-acknowledge',{ 
            acknowledge:true, 
            user : canceledUser
        });
        socket.broadcast.to(nonCanceledUser.socketId).
                emit('add-user-acknowledge',{ 
            acknowledge:true ,
            user : nonCanceledUser
        });
        
    } catch(e) {
        socket.emit('transaction-timer-expired-acknowledge',{ acknowledge:false });
        console.log(e);
    }
}

module.exports = transactionTimerExpire;