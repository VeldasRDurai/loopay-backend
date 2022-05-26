const { users, transactions } = require('../database/database');
const {
    // REQUEST_SEND,
    REQUEST_CANCEL,
    REQUEST_TIMER_EXPIRED,
    REQUEST_ACCEPTED,
    // REQUEST_REJECTED
} = require('../database/requestStateTypes');

const receiveRequestAccepted = async ({ requestTo, requestFrom, socket }) => {
    try{
        console.log('receiveRequestAccepted : ',{ 
            requestTo, 
            requestFrom
        });
        const requestToUser = await users.findOne({'email':requestTo})
        const currentTransaction = await transactions.findOne({ 
            'transactionNo': requestToUser.currentTransaction 
        });
        if( currentTransaction.requestState === REQUEST_CANCEL || 
            currentTransaction.requestState === REQUEST_TIMER_EXPIRED ){
            socket.emit('receive-request-accepted-acknowledge', {
                acknowledge: false
            });
            return;
        }
        const transactionEndTime = new Date() + (currentTransaction.searchDetails.radius * 1000 * 60 *5);
        await transactions.updateOne({'transactionNo':currentTransaction.transactionNo},{
            'requestState' : REQUEST_ACCEPTED,
            'requestStateOn' : new Date(),
            'transactionEndTime': transactionEndTime
        });
        socket.emit('receive-request-accepted-acknowledge', {
            acknowledge: true,
            transactionEndTime
        });
        const requestFromUser = await users.findOne({'email':requestFrom})
        // CHEACK IS ONLINE
        // if(requestFromUser.isOnline){}
        socket.broadcast.to(requestFromUser.socketId).
            emit('sent-request-acknowledge',{ 
                acknowledge: true,
                transactionEndTime
            });
    } catch(e){
        console.log(e);
    }
}

module.exports = receiveRequestAccepted;