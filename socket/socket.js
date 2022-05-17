const transactionSearch = require('./transcation-search');
const updateLocation = require('./update-location');
const addUser = require('./add-user');

module.exports = io => {
    io.on('connection' , socket => {
        console.log('user connected', socket.id);

        const includeSocketInPara = (funct, data) => 
            funct({ data, socket });
            
        socket.emit('connected');
        
        socket.on('add-user', 
            data => includeSocketInPara(addUser,data));
        socket.on('transaction-search', 
            data => includeSocketInPara(transactionSearch, data));
        socket.on('update-location', 
            data => includeSocketInPara(updateLocation, data));
    });
}