const { users, transactions } = require('../database/database');
const {
    // REQUEST_SEND,
    REQUEST_CANCEL,
    REQUEST_TIMER_EXPIRED,
    REQUEST_ACCEPTED,
    // REQUEST_REJECTED
} = require('../database/requestStateTypes');

const { MAINPAGE_TRANSACTION_MODE } = require('../database/currentModeTypes');

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
        
        const transactionEndTime = new Date( 
            Number( new Date() ) + Math.floor( currentTransaction.searchDetails.radius/100 * 1000 * 60 *5 ) );
        await transactions.updateOne({'transactionNo':currentTransaction.transactionNo},{
            'requestState' : REQUEST_ACCEPTED,
            'requestStateOn' : new Date(),
            'transactionActivated':true,
            'transactionEndTime': transactionEndTime
        });

        const requestFromUser = await users.findOne({'email':requestFrom})
        // CHEACK IS ONLINE
        // if(requestFromUser.isOnline){}
        await users.updateOne({'email': requestTo},{
            'currentMode': MAINPAGE_TRANSACTION_MODE,
            'transactionActivated':true,
            'transactionEndTime': transactionEndTime
        });
        await users.updateOne({'email': requestFrom},{
            'currentMode': MAINPAGE_TRANSACTION_MODE,
            'transactionActivated':true,
            'transactionEndTime':transactionEndTime
        })
        
        socket.emit('receive-request-accepted-acknowledge', {
            acknowledge: true,
            transactionActivated:true,
            transactionEndTime,
            currentTransaction: requestToUser.currentTransaction
        });
        socket.broadcast.to(requestFromUser.socketId).
            emit('sent-request-acknowledge',{ 
                acknowledge: true,
                transactionActivated:true,
                transactionEndTime,
                currentTransaction: requestFromUser.currentTransaction
            });
    } catch(e){
        console.log(e);
    }
}

module.exports = receiveRequestAccepted;