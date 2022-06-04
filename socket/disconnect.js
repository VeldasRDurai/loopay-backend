const { users, transactions } = require('../database/database');

const disconnect = async ({
    socket 
}) => {
    try{
        const user = await users.findOne({'socketId':socket.id});
        // console.log( 'user : ', user );
        // console.log( 'socketId : ', socket.id );
        await users.updateOne({'email':user.email},{
            "$set": {
                'isOnline' : false,
                'lastseen' : new Date(),
            }, "$unset": {
                'socketId' : '',
            }
        });

        if( !user.transactionActivated || new Date(user.transactionEndTime) < new Date()  ) return;
        const currentTransaction = await transactions.findOne({'transactionNo': user.currentTransaction});
        const userNext = await users.findOne({
            'email': currentTransaction.requestFrom !== user.email ? 
                currentTransaction.requestFrom : currentTransaction.requestTo
        });
        if( userNext.isOnline ){
            socket.broadcast.to( userNext.socketId )
                .emit('partner-disconnected',{});
        } else {
            // push
        }

    } catch(e){
        console.log(e);
    }
}

module.exports = disconnect;