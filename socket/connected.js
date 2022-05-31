const { users, transactions } = require('../database/database');
const {
    MAINPAGE_SEARCH_MODE,
    // MAINPAGE_SAVED_MODE,
    // MAINPAGE_TRANSACTION_MODE,
    // MAINPAGE_SHARE_MODE,
    // MAINPAGE_FEEDBACK_MODE,
} = require('../database/currentModeTypes');

const connected = async ({ email, socket }) => {
    try{
        console.log( email );
        const user = await users.findOne({ 'email':email });
        if( user === null ){
            console.log( 'new user' );
            await users({ 
                'email': email,
                'isOnline': true,
                'socketId': socket.id,
                'currentMode': MAINPAGE_SEARCH_MODE
            }).save();
        } else {
            await users.updateOne({ 'email':email },{
                'isOnline':true,
                'socketId': socket.id
            });
        }
        const updatedUser = await users.findOne({ 'email':email });
        socket.emit('add-user-acknowledge',{ 
            acknowledge:true,
            user :updatedUser
        });
        if(new Date(updatedUser.transactionEndTime) < new Date() || !updatedUser.transactionActivated ) return;
        
        const transaction = await transactions.findOne({'transactionNo': updatedUser.currentTransaction});

        const userNext = await users.findOne({
            'email': transaction.requestFrom !== updatedUser.email ? 
                transaction.requestFrom : transaction.requestTo
        });
        if( userNext.isOnline ){
            socket.broadcast.to( userNext.socketId )
                .emit('partner-connected',{});
        } else {
            // push
        }
    } catch(e){
        socket.emit('add-user-acknowledge',{ 
            acknowledge:false
        });
        console.log(e);
    }
}

module.exports = connected;