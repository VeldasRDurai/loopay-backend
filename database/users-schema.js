const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema ({
    email : String,
    // username  : String,
    // name : String,
    // hashedPassword  : String,

    // verifiedUser : Boolean,
    // hashedVerificationCode : String,
    // verificationCodeExpiryDate : Date,

    // refreshToken : String,

    // googleAccount : Boolean,
    // gotPersonalDetails : Boolean,

    lookingForPartner : Boolean,
    amount : Number,
    isSoftCash : Boolean,
    radius : Number,

    searches : [{
        amount : Number,
        isSoftCash : Boolean,
        radius : Number,
    }],
    transactions : [{
        parnerID: String
    }],

    isOnline : Boolean,
    lastseen : Date,

    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number]
        }
    },
});

module.exports = usersSchema ;

// REFERENCE
// 1. https://www.mongodb.com/docs/manual/reference/operator/query/center/#example
// 2. https://stackoverflow.com/a/61510540/14476642

// email : 
// username  : 
// name : 
// hashedPassword  : 
// verifiedUser : 
// hashedVerificationCode :
// verificationCodeExpiryDate : 
// refreshToken :
// googleAccount : 
// gotPersonalDetails : 