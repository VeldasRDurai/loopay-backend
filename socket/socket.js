const transactionSearch = require('./transcation-search');
const updateLocation = require('./update-location');
const addUser = require('./add-user');
const sendRequest = require('./sent-request');
const cancelRequest = require('./cancel-request');
const receiveRequestAccepted = require('./receive-request-accepted');
const receiveRequestRejected = require('./receive-request-rejected');
const saveSearch = require('./save-search');
const saveSearchDelete = require('./save-search-delete');
const transactionDetails = require('./transaction-details');
const transactionCancel = require('./transaction-cancel');
const transactionFound = require('./transaction-found');

module.exports = io => {
    io.on('connection' , socket => {
        console.log('user connected', socket.id);

        // const includeSocketInPara = (funct, data) => 
        //     funct({ data, socket });
        const repitionReducer = (event, funct) =>
            socket.on(event, data => funct({ ...data, socket }))

        socket.emit('connected');
        
        // socket.on('add-user', 
        //     data => includeSocketInPara(addUser,data));
        // socket.on('transaction-search', 
        //     data => includeSocketInPara(transactionSearch, data));
        // socket.on('update-location', 
        //     data => includeSocketInPara(updateLocation, data));
        // socket.on('update-location', 
        //     data => includeSocketInPara(updateLocation, data));

        repitionReducer('add-user', addUser);
        repitionReducer('cancel-request',cancelRequest);
        repitionReducer('receive-request-accepted',receiveRequestAccepted);
        repitionReducer('receive-request-rejected',receiveRequestRejected);
        repitionReducer('send-request', sendRequest);
        repitionReducer('transaction-search', transactionSearch);
        repitionReducer('update-location', updateLocation);
        repitionReducer('save-search', saveSearch);
        repitionReducer('save-search-delete', saveSearchDelete);
        repitionReducer('transaction-details', transactionDetails);
        repitionReducer('transaction-cancel', transactionCancel);
        repitionReducer('transaction-found', transactionFound);
    });
}