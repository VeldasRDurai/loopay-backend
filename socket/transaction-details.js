const { transactions } = require('../database/database');

const transactionDetails = async (
        { currentTransaction, socket }) => {
    try{
        console.log( 'transactionDetails' );
        const details = await transactions.findOne({ 'transactionNo': currentTransaction });
        socket.emit('transaction-details-acknowledge', { 
            acknowledge : true,
            details 
        });
    } catch(e){
        socket.emit('transaction-details-acknowledge', { 
            acknowledge : false
        });
        console.log(e);
    }
}

module.exports = transactionDetails;