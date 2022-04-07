const mongoose = require("mongoose");

// const { accountSchema } = require('./account-schema');
// const { activeUsersSchema } = require('./active-users-schema');
// const { subscriptionsSchema } = require('./subscriptions-schema');

const usersSchema = require('./users-schema');

const databaseName = 'loopay';
mongoose.connect( `mongodb://localhost:27017/${databaseName}`,{ 
    useNewUrlParser    : true, 
    useUnifiedTopology : true
});

const users = mongoose.model( 'Users' , usersSchema );
// const activeUsers = mongoose.model( 'ActiveUsers' , activeUsersSchema );
// const subscriptions = mongoose.model('Subscriptions', subscriptionsSchema );

module.exports = { users };