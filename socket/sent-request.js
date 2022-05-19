const { users } = require('../database/database');

const sendRequest = async ({ email, selectedUserDetails, requestTimerExpiesOn, socket }) => {
    try{
        const sendUser = await users.findOne({ 'email': selectedUserDetails.email });
        if( sendUser.isOnline ){
            socket.broadcast.to(sendUser.socketId).
                emit('receive-request',{ requestFrom: email });
        } else {
            // PUSH NOTIFICTAION
        }
    } catch(e){
        console.log(e);
    }
}

module.exports = sendRequest;