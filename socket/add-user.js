const { users } = require('../database/database');

const addUser = async ({ data, socket }) => {
    try{
        console.log( data );
        const user = await users.findOne({ 'email':data.email });
        if( user === null ){
            await users({ 
                'email': data.email,
                'isOnline': true,
                'socketId': socket.id
            }).save();
        } else {
            await users.updateOne({ 'email':data.email },{
                'isOnline':true,
                'socketId': socket.id
            });
        }
    } catch(e){
        console.log(e);
    }
}

module.exports = addUser;