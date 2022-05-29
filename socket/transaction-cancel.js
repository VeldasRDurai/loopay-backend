const { users, transactions } = require('../database/database');

const { MAINPAGE_FEEDBACK_MODE } = require('../database/currentModeTypes');
const { TRANSACTION_CANCEL_MODE } = require('../database/transactionResultTypes');
 
const transactionCancel = async (
        { email, currentTransaction, socket }) => {
    try{
        console.log( 'transactionCancel : ', { email, currentTransaction } );
        await transactions.updateOne({'transactionNo':currentTransaction},{
            "$set" : {
                'transactionActivated':false,
                'transactionResult':TRANSACTION_CANCEL_MODE,
                'transactionCanceledBy': email
            },
            "$unset" : {
                'transactionEndTime': '',
            }
        });
        const transaction = await transactions.findOne({ 'transactionNo' : currentTransaction });
        await users.updateOne({ 'email': transaction.requestFrom },{
            "$set":{
                'currentMode' : MAINPAGE_FEEDBACK_MODE,
                'lastSearchSaved' : false,
                'transactionActivated' : false,
            },
            "$unset":{
                'lastSearchUpto' : '',
                'requestFrom' : '' ,
                'requestFromUpto' :'' ,
                'transactionEndTime': '',
            }
        });
        await users.updateOne({ 'email': transaction.requestTo },{
            "$set":{
                'currentMode' : MAINPAGE_FEEDBACK_MODE,
                'lastSearchSaved' : false,
                'transactionActivated' : false,
            },
            "$unset":{
                'lastSearchUpto' : '',
                'requestFrom' : '' ,
                'requestFromUpto' :'' ,
                'transactionEndTime': '',
            }
            // currentMode : MAINPAGE_FEEDBACK_MODE,
            // lastSearchSaved : false,
            // lastSearchUpto : undefined,
            // requestFrom : undefined,
            // requestFromUpto : undefined,
            // transactionActivated : false,
            // transactionEndTime: undefined,
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