const { users } = require('../database/database');

const updateLocation = async ({ 
    email, 
    longitude,
    latitude,
    socket 
}) => {
    try{
        console.log('update location : ',{
            email, 
            longitude,
            latitude,
        })
        const user = await users.findOne({'email': email});
        if( user===null ) return;

        await users.updateOne({'email': email}, {
            "$set" : { 
                'location.coordinates': [ longitude, latitude, ] }
        });
        
    } catch(e){
        console.log(e);
    }
}

module.exports = updateLocation;

// REFERENCE

// 1. https://stackoverflow.com/a/19030056/14476642