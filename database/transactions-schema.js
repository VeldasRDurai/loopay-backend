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

    transactionActivated : Boolean,
    transactionEndTime : Date,

    requestFromLocation : {
        type: { type: String, default: 'Point', },
        coordinates: { type: [Number] }
    },
    requestToLocation : {
        type: { type: String, default: 'Point', },
        coordinates: { type: [Number] }
    },

    requestFromFound : Boolean,
    requestToFound : Boolean,

    chat : [{
        sender : String,
        message : String,
        time : Date,
        readed : Boolean
    }]
});

module.exports = transactionsSchema ;