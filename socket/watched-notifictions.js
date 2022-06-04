const { users } = require('../database/database');

const watchedNotifications = async ({  
    email, 
    socket, 
}) => {
    try{
        await users.updateOne({'email':email},{
            '$set' : {
                'notifications.$.readed':true
            }
        });
    } catch(e){
        console.log(e);
    }
}

module.exports = watchedNotifications;