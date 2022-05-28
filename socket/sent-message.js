const { users, transactions } = require('../database/database');

const sentMessage = async ({ 
    email, 
    currentTransaction, 
    message,   
    socket 
}) => {
    try{
        console.log('sentMessage : ',{ 
            email,  
            message
        });
        await transactions.updateOne({'transactionNo':currentTransaction},{
            '$push' : { 'chat' : {
                'sender': email,
                'message': message,
                'time': new Date()
            }}
        });
        const transaction = await transactions.findOne({'transactionNo':currentTransaction});
        // const requestFromUser = await users.findOne({'email': transaction.requestFrom });
        // const requestToUser   = await users.findOne({'email': transaction.requestTo   });

        // // console.log( 'requestFromUser : ', requestFromUser.email );
        // // console.log( 'requestToUser : ', requestToUser.email );

        // socket.broadcast.to(requestFromUser.socketId)
        //     .emit('transaction-details-acknowledge',{ 
        //     acknowledge : true,
        //     // chat : transaction.chat
        //     details : transaction,
        //     user: requestFromUser.email
        // });
        // socket.broadcast.to(requestToUser.socketId)
        //     .emit('transaction-details-acknowledge',{ 
        //     acknowledge : true,
        //     // chat : transaction.chat
        //     details : transaction,
        //     user: requestToUser.email
        // });

        const nextUser = await users.findOne({ 
            'email': email !== transaction.requestFrom ?
                transaction.requestFrom : transaction.requestTo
        });

        // socket.emit('transaction-details-acknowledge',{
        socket.emit('sent-message-acknowledge',{
            acknowledge : true,
            // details : transaction,
            chat : transaction.chat,
        });
        // socket.broadcast.to(nextUser.socketId)
        //     .emit('transaction-details-acknowledge',{ 
        socket.broadcast.to(nextUser.socketId)
            .emit('sent-message-acknowledge',{ 
            acknowledge : true,
            // details : transaction,
            chat : transaction.chat,
        });
    } catch(e){
        socket.emit('sent-message-acknowledge',{ 
            acknowledge : false,
        });
        console.log(e);
    }
}

module.exports = sentMessage;