const { users, transactions } = require('../database/database');

const { MAINPAGE_SEARCH_MODE } = require('../database/currentModeTypes');

const feedbackSubmit = async ({ 
    email, 
    currentTransaction,
    feedback,
    socket 
}) => {
    try{
        console.log('feedbackSubmit : ', { 
            email, 
            currentTransaction,
            feedback
        });
        const transaction = await transactions.findOne({'transactionNo':currentTransaction});
        await transactions.updateOne({'transactionNo':currentTransaction},{
            "$set" : transaction.requestFrom === email ? 
                { 'requestFromFeedback': feedback, 'transactionActivated': false, 'transactionEndTime': undefined,} : 
                { 'requestToFeedback'  : feedback, 'transactionActivated': false, 'transactionEndTime': undefined,}
        });

        await users.updateOne({ 'email': email },{
            currentMode : MAINPAGE_SEARCH_MODE,
            lastSearchSaved : false,
            lastSearchUpto : undefined,
            requestFrom : undefined,
            requestFromUpto : undefined,
            transactionActivated : false,
            transactionEndTime: undefined,
            currentTransaction: undefined,
        });

        const user = await users.findOne({'email':email});

        socket.emit('add-user-acknowledge',{ 
            acknowledge : true, 
            user
        })

    } catch(e){
        console.log(e);
    }
}

module.exports = feedbackSubmit;