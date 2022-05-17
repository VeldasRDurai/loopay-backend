// const mongoose = require('mongoose');
// const { users } = require('../database/database');

const transactionSearch = async ({ data, socket }) => {
    try{
        // const details = await users.findOne({'email':chattingWithEmail});
        console.log( 'transaction-search', data );
    } catch(e){
        console.log(e);
    }
}

module.exports = transactionSearch;