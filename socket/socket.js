const transactionSearch = require('./transcation-search');
const updateLocation = require('./update-location');
const connected = require('./connected');
const sentRequest = require('./sent-request');
const cancelRequest = require('./cancel-request');
const receiveRequestAccepted = require('./receive-request-accepted');
const receiveRequestRejected = require('./receive-request-rejected');
const saveSearch = require('./save-search');
const saveSearchDelete = require('./save-search-delete');
const transactionDetails = require('./transaction-details');
const transactionCancel = require('./transaction-cancel');
const transactionFound = require('./transaction-found');
const sentMessage = require('./sent-message');
const transactionTimerExpire = require('./transaction-timer-expired');
const feedbackSubmit = require('./feedback-submit');
const saveSubscription = require('./save-subscription');
const transactionHistory = require('./trasnsaction-history');
const disconnect = require('./disconnect');

module.exports = io => {
    io.on('connection' , socket => {
        console.log('user connected', socket.id);

        const repitionReducer = (event, funct) =>
            socket.on(event, data => funct({ ...data, socket }))

        socket.emit('connected');
        repitionReducer('connected', connected);
        repitionReducer('cancel-request',cancelRequest);
        repitionReducer('receive-request-accepted',receiveRequestAccepted);
        repitionReducer('receive-request-rejected',receiveRequestRejected);
        repitionReducer('send-request', sentRequest);
        repitionReducer('transaction-search', transactionSearch);
        repitionReducer('update-location', updateLocation);
        repitionReducer('save-search', saveSearch);
        repitionReducer('save-search-delete', saveSearchDelete);
        repitionReducer('transaction-details', transactionDetails);
        repitionReducer('transaction-cancel', transactionCancel);
        repitionReducer('transaction-found', transactionFound);
        repitionReducer('sent-message',sentMessage);
        repitionReducer('transaction-timer-expired',transactionTimerExpire);
        repitionReducer('feedback-submit',feedbackSubmit);
        repitionReducer('save-subscription',saveSubscription);
        repitionReducer('transaction-history', transactionHistory);
        repitionReducer('disconnect', disconnect);
    });
}