//Server Config
//--------------
var express = require('express');
var path = require('path');
var db = require('./db.js');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userController = require('./Controllers/userController.js');
var app = express();

var routes = require('./Routes/index');

/* allows access to users file in routes*/
var users = require('./Routes/users');

/* allows access to photos file in routes*/
var photos = require('./Routes/photos');

var gps = require('./Routes/gps');

var events = require('./Routes/events');

// Headers set for testing 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../shout/www/')));

app.use('/users', users);
app.use('/photos', photos);
app.use('/gps', gps);
app.use('/events', events);



module.exports = app;
