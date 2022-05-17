const { users } = require('../database/database');

const addUser = async ({ data, socket }) => {
    try{
        console.log( data );
        const user = await users.findOne({ 'email':data.email });
        if( user !== null ) return
        await users({ 
            'email': data.email
        }).save();
    } catch(e){
        console.log(e);
    }
}

module.exports = addUser;