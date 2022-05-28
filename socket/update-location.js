const { users, transactions } = require('../database/database');

const updateLocation = async ({ 
    email, 
    longitude,
    latitude,
    socket 
}) => {
    try{

        await users.updateOne({'email': email}, {
            "$set" : { 
                'location.coordinates': [ longitude, latitude, ] }
        });
        const user = await users.findOne({'email': email}); 
        if(new Date(user.transactionEndTime) < new Date() || !user.transactionActivated ) return;
        
        const currentTransaction = await transactions.findOne({'transactionNo': user.currentTransaction});
        await transactions.updateOne({'transactionNo': currentTransaction.transactionNo},{
            "$set" : currentTransaction.requestFrom === user.email ? {
                'requestFromLocation.coordinates': [ longitude, latitude, ]
            } : {
                'requestToLocation.coordinates': [ longitude, latitude, ]
            }
        })

        // const userNext = await users.findOne({
        //     'email': currentTransaction.requestFrom !== user.email ? 
        //         currentTransaction.requestFrom : currentTransaction.requestTo
        // });
        // socket.emit('transaction-details-acknowledge',{
        //     acknowledge : true,
        //     details:  currentTransaction
        // })
        // socket.broadcast.to( userNext.socketId )
        //     .emit('transaction-details-acknowledge',{ 
        //     acknowledge : true,
        //     details:  currentTransaction
        // });

    } catch(e){
        console.log(e);
    }
}

module.exports = updateLocation;

// REFERENCE

// 1. https://stackoverflow.com/a/19030056/14476642