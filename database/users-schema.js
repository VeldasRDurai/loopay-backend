const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema ({
    email : { 
        type : String,
        // unique: true  
    },
    username  : { 
        type : String,
        // unique: true  
    },
    name : { type : String },
    hashedPassword  : { type : String },

    verifiedUser : { type : Boolean },
    hashedVerificationCode : { type : String },
    verificationCodeExpiryDate : { type : Date },

    refreshToken : { type : String },

    googleAccount : { type : Boolean },
    gotPersonalDetails : { type : Boolean },
});

module.exports = usersSchema ;

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