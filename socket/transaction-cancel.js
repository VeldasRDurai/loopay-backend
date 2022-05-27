const { users, transactions } = require('../database/database');

const { MAINPAGE_FEEDBACK_MODE } = require('../database/currentModeTypes');

const transactionCancel = async (
        { email, currentTransaction, socket }) => {
    try{
        console.log( 'transactionCancel : ', { email, currentTransaction } );
        await transactions.updateOne({'transactionNo':currentTransaction},{
            'transactionActivated':false
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

        socket.emit('transaction-cancel-acknowledge',{ 
            acknowledge:true, 
        });
        socket.broadcast.to(nonCanceledUser.socketId).
                emit('transaction-cancel-acknowledge',{ acknowledge:true });

        
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
        socket.emit('transaction-cancel-acknowledge',{ acknowledge:false });
        console.log(e);
    }
}

module.exports = transactionCancel;