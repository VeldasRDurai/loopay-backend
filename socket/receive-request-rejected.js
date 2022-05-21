const { users, transactions } = require('../database/database');
const {
    // REQUEST_SEND,
    // REQUEST_CANCEL,
    // REQUEST_TIMER_EXPIRED,
    // REQUEST_ACCEPTED,
    REQUEST_REJECTED
} = require('../database/requestStateTypes');

const receiveRequestRejected = async ({ requestTo, requestFrom, socket }) => {
    try{
        const requestToUser = await users.findOne({'email':requestTo})
        const currentTransaction = await transactions.findOne({ 
            'transactionNo': requestToUser.currentTransaction 
        });

        await transactions.updateOne({'transactionNo':currentTransaction.transactionNo},{
            requestState : REQUEST_REJECTED,
            requestStateOn : new Date()
        });

        // CHEACK IS ONLINE 
        const requestFromUser = await users.findOne({'email':requestFrom})
        socket.broadcast.to(requestFromUser.socketId).
            emit('sent-request-acknowledge',{ 
                acknowledge: false
            });
    } catch(e){
        console.log(e);
    }
}

module.exports = receiveRequestRejected;