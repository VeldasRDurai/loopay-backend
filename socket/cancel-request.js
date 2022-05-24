const { users, transactions } = require("../database/database");

const { REQUEST_CANCEL } = require('../database/requestStateTypes');

const cancelRequest = async ({   
    requestFrom,
    socket 
}) => {
    try{
        const requestFromUser = await users.findOne({ 'email': requestFrom });
        await transactions.updateOne({'transactionNo':requestFromUser.currentTransaction},{
            requestState: REQUEST_CANCEL,
            requestStateOn: new Date(),
        })
        socket.emit('cancel-request-acknowledge',{ acknowledge: true });
    } catch(e){
        socket.emit('cancel-request-acknowledge',{ acknowledge: false });
        console.log(e);
    }
}

module.exports = cancelRequest;

// REFERENCE

// 1. https://stackoverflow.com/a/42777522/14476642