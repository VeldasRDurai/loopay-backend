const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema ({
    email : String,
    username  : String,
    name : String,
    hashedPassword  : String,
    
    verifiedUser : Boolean,
    hashedVerificationCode : String,
    verificationCodeExpiryDate : Date,

    refreshToken : String,

    googleAccount : Boolean,
    gotPersonalDetails : Boolean,
    
    isOnline : Boolean,
    socketId : String,
    lastseen : Date,
    
    currentMode : String,

    subscription: {
        endpoint: String,
        keys: mongoose.Schema.Types.Mixed,
        createDate: Date
    },

    lastSearch : {
        amount : Number,
        isSoftCash : Boolean,
        radius : Number,
        timeStamp: Date
    },
    searches : [{
        amount : Number,
        isSoftCash : Boolean,
        radius : Number,
        timeStamp: Date
    }],
    
    lastSearchSaved : Boolean,
    lastSearchUpto : Date,

    requestFrom : String,
    requestFromUpto : Date,
    
    currentTransaction : mongoose.ObjectId,
    transactions : [ mongoose.ObjectId ],

    transactionActivated : { type:Boolean, default: false },
    transactionEndTime: Date,

    notifications : [{
        sender: String,
        message : String,
        readed : {
            type: Boolean,
            default : false
        },
        time : {
            type: Date,
            default: Date.now
        }
    }],

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