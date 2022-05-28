const mongoose = require("mongoose");
const { TRANSACTION_LIVE_MODE } = require('../database/transactionResultTypes')

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

    requestFromFound : { type: Boolean, default: false },
    requestToFound   : { type: Boolean, default: false },

    chat : [{
        sender : String,
        message : String,
        time : Date
    }],

    transactionResult : { type: String, default: TRANSACTION_LIVE_MODE },
    transactionCanceledBy : String,

    requestFromFeedback : String,
    requestToFeedback : String,
    
});

module.exports = transactionsSchema ;