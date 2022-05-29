const { users } = require('../database/database');

const saveSubscription = async ({ 
    email, 
    subscription, 
    socket 
}) => {
    try{
        console.log('saveSubscription : ', {
            email,
            subscription
        });
        await users.updateOne({ 'email': email },{
            'subscription': subscription
        });
    } catch(e){
        console.log(e);
    }
}

module.exports = saveSubscription;