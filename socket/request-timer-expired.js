const { users, transactions } = require('../database/database');
const { REQUEST_TIMER_EXPIRED } = require('../database/requestStateTypes')

const requestTimerExpired = async ({
    email,
    socket 
}) => {
    try{
        const user = await users.findOne({ 'email': email });
        await transactions.updateOne({'transactionNo':user.currentTransaction},{
            requestState: REQUEST_TIMER_EXPIRED,
            requestStateOn: new Date(),
        })
    } catch(e){
        console.log(e);
    }
}

module.exports = requestTimerExpired;