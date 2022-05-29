const { transactions } = require('../database/database');

const transactionHistory = async ({  
    email, 
    socket, 
}) => {
    try{
        console.log('transactionHistory : ',{  
            email, 
            socket, 
        });
        const history = await transactions.find({ "$or":[ 
            {'requestFrom':email},
            {'requestTo'  :email}
        ]});
        console.log( history );
        socket.emit('transaction-history-acknowledge', { 
            acknowledge : true,
            history
        });
    } catch(e){
        socket.emit('transaction-history-acknowledge', { 
            acknowledge : false
        });
        console.log(e);
    }
}

module.exports = transactionHistory;