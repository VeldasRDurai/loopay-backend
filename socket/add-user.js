const { users } = require('../database/database');

const addUser = async ({ email, socket }) => {
    try{
        console.log( email );
        const user = await users.findOne({ 'email':email });
        if( user === null ){
            await users({ 
                'email': email,
                'isOnline': true,
                'socketId': socket.id
            }).save();
        } else {
            await users.updateOne({ 'email':email },{
                'isOnline':true,
                'socketId': socket.id
            });
        }
    } catch(e){
        console.log(e);
    }
}

module.exports = addUser;