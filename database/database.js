const mongoose = require("mongoose");

const usersSchema = require('./users-schema');
const transactionsSchema = require('./transactions-schema');

const databaseName = 'loopay';
mongoose.connect( `mongodb://localhost:27017/${databaseName}`,{ 
    useNewUrlParser    : true, 
    useUnifiedTopology : true
});

const users = mongoose.model( 'Users' , usersSchema );
const transactions = mongoose.model( 'Transactions', transactionsSchema )

module.exports = { 
    users,
    transactions
};