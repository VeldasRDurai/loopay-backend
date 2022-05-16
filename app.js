require('dotenv').config();

var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const http = require('http');

var app = express();
const server = http.createServer(app);
const io = socketio( server , { 
    cors:{ origin: process.env.FRONTEND_DEVELOPMENT_URL },
});
const socket = require('./socket/socket');
socket(io);
    
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ 
    origin : app.settings.env === 'development' ? 
        process.env.FRONTEND_DEVELOPMENT_URL :
        process.env.FRONTEND_PRODUCTION_URL  , 
    credentials : true 
}));


var routes = require('./routes/routes');
app.use('/', routes() );

// module.exports = app;
module.exports = { 
    app, 
    server 
};
