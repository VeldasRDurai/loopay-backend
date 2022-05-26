const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema ({
    transactionNo : mongoose.ObjectId,
    searchDetails : {
        amount : Number,
        isSoftCash : Boolean,
        radius : Number,
        timeStamp: Date
    },
    
    requestFrom : String,
    requestTo  : String,
    
    requestTimerStartsOn : Date,
    requestTimerExpiesOn : Date,
    
    requestState : String,
    requestStateOn : Date,

    transactionEndTime : Date,
});

module.exports = transactionsSchema ;