const { users, transactions } = require("../database/database");

const { REQUEST_CANCEL } = require('../database/requestStateTypes');

const cancelRequest = async ({   
    requestFrom , 
    // requestTo,
    socket 
}) => {
    try{
        const requestFromUser = await users.findOne({ 'email': requestFrom });
        // await users.updateOne({
        //     'email': requestFrom, 
        //     'transactions.transactionNo': requestFromUser.currentTransaction
        // },{
        //     "$set": { 
        //         'transactions.$.requestState'  : REQUEST_CANCEL,
        //         'transactions.$.requestStateOn': new Date()
        //     }
        // });
        // await users.updateOne({
        //     'email': requestTo, 
        //     'transactions.transactionNo': requestFromUser.currentTransaction
        // },{
        //     "$set": { 
        //         'transactions.$.requestState'  : REQUEST_CANCEL,
        //         'transactions.$.requestStateOn': new Date()
        //     }
        // });
        await transactions.updateOne({'transactionNo':requestFromUser.currentTransaction},{
            requestState: REQUEST_CANCEL,
            requestStateOn: new Date(),
        })
        socket.emit('cancel-request-acknowledge',{ acknowledge: true });

    } catch(e){
        console.log(e);
    }
}

module.exports = cancelRequest;

// REFERENCE

// 1. https://stackoverflow.com/a/42777522/14476642