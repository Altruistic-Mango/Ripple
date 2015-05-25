var User = require('../Models/User.js');
var mongoose = require('mongoose');
var db = require('../db.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs')

var userController = {

signupUser: function(req, res) {  
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var randInt = Math.floor(Math.random() * 10000);

  User.findOne({ username: req.body.username })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password,
          uuId: randInt
        });
        newUser.save(function(err, newUser) { 
          if (err) {
            console.log(err);
            res.send(500, err);
          }
          res.json(newUser)
        });
      } else {
        console.log('Account already exists');
        res.end();
      }
    });
  },

  retrieveUsers: function(req, res) {
    User.find({}, function(err, data) {
      if (!err) { 
          res.send(200, data);
      } 
      else {
        throw err;
      }
    });
  }
};

module.exports = userController;



