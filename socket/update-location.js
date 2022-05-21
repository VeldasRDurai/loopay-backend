const { users } = require('../database/database');

const updateLocation = async ({ data, socket }) => {
    try{
        // console.log( data );
        const user = await users.findOne({'email':data.email});
        if( user===null ) return;

        await users.updateOne({'email':data.email}, {
            "$set" : { 
                'location.coordinates': [ data.longitude, data.latitude, ] }
        });
        
    } catch(e){
        console.log(e);
    }
}

module.exports = updateLocation;

// REFERENCE

// 1. https://stackoverflow.com/a/19030056/14476642