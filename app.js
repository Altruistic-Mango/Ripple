//Server Config
//--------------

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userController = require('./Controllers/userController.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


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
app.use(express.static(path.join(__dirname, 'public')));


app.post('/signup', function(req, res) {
  console.log('got signup request');
  userController.signupUser(req, res)
});

app.get('/users', function(req, res) {
  console.log('listing users');
  userController.retrieveUsers(req, res);
})


module.exports = app;
