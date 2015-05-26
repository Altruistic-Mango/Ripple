var User = require('../Models/User.js');
var mongoose = require('mongoose');
var db = require('../db.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs')

var userController = {

signupUser: function(req, res) {  

  var username = req.body.username;
  var password = bcrypt.hashSync(req.body.password);
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
            res.send(200);
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
  },


  signinUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, person) {
      if (err) console.log(err);
      else if (!person) {
        console.log("This user does not exist.");
        res.send('None found');
      }

      else {
        var hashedPassword = person.password;
        bcrypt.compare(password, hashedPassword, function(err, match) {
          if (err) return (err);
          console.log(match);
          if (match) {
            res.json({userId: person.uuId});
            res.end();
          }
          else {
            console.log('not a match')
            res.end()
          }
        });
      }
    });
  },

}



module.exports = userController;