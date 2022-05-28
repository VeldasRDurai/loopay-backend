const { users, transactions } = require('../database/database');

const { MAINPAGE_FEEDBACK_MODE } = require('../database/currentModeTypes');

const { 
    TRANSACTION_LIVE_MODE, 
    TRANSACTION_SUCCESS_MODE 
} = require('../database/transactionResultTypes');

const transactionFound = async (
        { email, currentTransaction, found, socket }) => {
    try{
        console.log('transactionFound : ',{ email, currentTransaction, found});
        const transaction = await transactions.findOne({'transactionNo': currentTransaction});
        
        await transactions.updateOne({'transactionNo': currentTransaction},{
            "$set" : ( transaction.requestFrom === email ) ? { 
                'requestFromFound' : found,
                'transactionResult' : ( transaction.requestToFound === true && found === true ) ?
                    TRANSACTION_SUCCESS_MODE : TRANSACTION_LIVE_MODE
            } : { 
                'requestToFound' : found,
                'transactionResult' : ( transaction.requestFromFound === true && found === true ) ?
                TRANSACTION_SUCCESS_MODE : TRANSACTION_LIVE_MODE
            }
        });

        // transaction.requestFrom === email && transaction.requestToFound === true && found === true
        // transaction.requestTo === email && transaction.requestFromFound === true && found === true

        // if( transaction.requestFrom === email ) {
        //     await transactions.updateOne({'transactionNo': currentTransaction},{
        //         "$set" : { 
        //             'requestFromFound' : found,
        //             'transactionResult' : ( transaction.requestToFound === true && found === true ) ?
        //                 TRANSACTION_SUCCESS_MODE : TRANSACTION_LIVE_MODE
        //         }
        //     });
        // } else {
        //     await transactions.updateOne({'transactionNo': currentTransaction},{
        //         "$set" : { 
        //             'requestToFound' : found,
        //             'transactionResult' : ( transaction.requestFromFound === true && found === true ) ?
        //                 TRANSACTION_SUCCESS_MODE : TRANSACTION_LIVE_MODE
        //         }
        //     });
        // }

        await users.updateOne({'email': transaction.requestFrom !== email ? 
                transaction.requestFrom : transaction.requestTo
        },{ 'currentMode' : MAINPAGE_FEEDBACK_MODE,});

        await users.updateOne({'email': email},{ 'currentMode' : MAINPAGE_FEEDBACK_MODE, });


        const updatedTransaction = await transactions.findOne({'transactionNo': currentTransaction});
        const userNext = await users.findOne({
            'email': transaction.requestFrom !== email ? 
                transaction.requestFrom : 
                transaction.requestTo
        });

        socket.emit('transaction-details-acknowledge', { 
            acknowledge : true,
            details :updatedTransaction
        });
        socket.broadcast.to(userNext.socketId).emit('transaction-details-acknowledge',{ 
            acknowledge : true,
            details : updatedTransaction
        });
    } catch(e) {
        socket.emit('transaction-details-acknowledge', { 
            acknowledge : false
        });
        console.log(e);
    }
}

module.exports = transactionFound;