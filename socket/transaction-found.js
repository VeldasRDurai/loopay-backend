const { transactions } = require('../database/database');

const transactionFound = async (
        { email, currentTransaction, socket }) => {
    try{
        const transaction = await transactions.findOne({'transactionNo': currentTransaction});
        await transactions.updateOne({'transactionNo': currentTransaction},{
            "$set" : transaction.requestFrom === email ? {
                'requestFromFound' : true
            } : {
                'requestToFound' : true
            }
        });

        const details = await transactions.findOne({'transactionNo': currentTransaction});
        socket.emit('transaction-details-acknowledge', { 
            acknowledge : true,
            details 
        });
    } catch(e) {
        socket.emit('transaction-details-acknowledge', { 
            acknowledge : false
        });
        console.log(e);
    }
}

module.exports = transactionFound;