const mongoose = require("mongoose");

const usersSchema = require('./users-schema');

const databaseName = 'loopay';
mongoose.connect( `mongodb://localhost:27017/${databaseName}`,{ 
    useNewUrlParser    : true, 
    useUnifiedTopology : true
});

const users = mongoose.model( 'Users' , usersSchema );

module.exports = { users };