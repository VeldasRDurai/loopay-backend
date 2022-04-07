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
    hashedVerificationCodeExpiryDate : { type : Date },

});

module.exports = usersSchema ;