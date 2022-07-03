const { users } = require('../database/database');

const transactionSearch = async (
        { amount, isSoftCash, radius, email, socket }) => {

    try{
        console.log( 'transaction-search = ', { amount, isSoftCashN: isSoftCash, isSoftCash:Boolean(isSoftCash), radius, email } );
        // 1
        await users.updateOne({'email':email},{
            "$set":  { 'lastSearch': { amount, isSoftCash: Boolean(Number(isSoftCash)), radius } },
            "$push": { 'searches'  : { amount, isSoftCash: Boolean(Number(isSoftCash)), radius } }
        })


        // To calculate radius we divide kilometer to 6378.1, and miles to 3963.2 as described here.
        // https://www.mongodb.com/docs/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
        // The aforementioned operations use radians for distance. 
            // Other spherical query operators do not, such as $geoWithin.


        
        const user = await users.findOne({'email':email});
        const lastSearchResults = await users.find({
            'email' : { $ne : email },
            // 'location.coordinates' : {
            //     $geoWithin: { $center: [ user.location.coordinates , radius ] } 
            // },
            'lastSearchSaved':true,
            // 'lastSearchUpto' : { $gt : new Date()  },
            'lastSearch.amount': { $gte : amount },
            'lastSearch.isSoftCash': !Boolean(Number(isSoftCash))
        });

        console.log('lastSearchResults : ', lastSearchResults);
        // const user2 = await users.find();
        // // console.log('transaction-search-result = ' , user2 );
        socket.emit('transaction-search-result' , { lastSearchResults });
    } catch(e){
        console.log(e);
    }
}

module.exports = transactionSearch;

// REFERENCE

// 1. https://stackoverflow.com/a/41502103/14476642


// https://www.movable-type.co.uk/scripts/latlong.html


// "email" : "das@gmail.com","location" : { "type" : "Point", "coordinates" : [77, 20] }