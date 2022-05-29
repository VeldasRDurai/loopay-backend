const { users } = require('../database/database');
const {
    MAINPAGE_SEARCH_MODE,
    // MAINPAGE_SAVED_MODE,
    // MAINPAGE_TRANSACTION_MODE,
    // MAINPAGE_SHARE_MODE,
    // MAINPAGE_FEEDBACK_MODE,
} = require('../database/currentModeTypes');

const addUser = async ({ email, socket }) => {
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
    } catch(e){
        socket.emit('add-user-acknowledge',{ 
            acknowledge:false
        });
        console.log(e);
    }
}

module.exports = addUser;