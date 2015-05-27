var User = require('../Models/User.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');

var userController = {

signupUser: function(req, res) {  


  var username = req.body.username;
  var password = bcrypt.hashSync(req.body.password);
  var randInt = function() {
    var id = ""
    while (id.length < 7) {
      id +=  Math.floor(Math.random() * 10);
    }
    return id;
  };


  var user = this.getUserFromDB({ username: req.body.username });
    if (!user) {
      var newUser = new User({
        username: username,
        password: password,
        userId: randInt(),
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
        res.send(500);
        res.end();
      }
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

    var user = this.getUserFromDB({ username: req.body.username }, function(user) {

      if (!user) {
        console.log('user not found');
        res.end();
      }

      else {
        var hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function(err, match) {
          if (err) return (err);
          console.log(match);
          if (match) {
            res.json(user);
            res.end();
          }
          else {
            console.log('not a match');
            res.end();
          }
        });
      }
    });
  },

  deleteUser: function(username) {
    User.remove({"username": username}, function(err){
      if(err){
        console.log(err);
      }
    });
  },

  getUserFromDB: function(person, cb) {   
    if (person.uuId) {
      User.findOne({uuId: person.uuId}, function(err, person) {
        if (err) console.log(err);
        else if (person) {
          return person;
        }
        else return null;
      });
    }

    else if (person.username) {
      User.findOne({username: person.username}, function(err, person) {
        if (err) console.log(err);
        else if (person) {
          cb(person);
        }
        else return null;
      });
    }
  },

  updateInbox: function(userId, eventObj, cb) {
    var query = {userId: userId};
    User.findOne(query, function(err, user) {
      if (err) {
        console.log(err);
      }
      else if (user) {
        console.log(user);
        user.inbox.push(eventObj);
        user.save();
      }
    })
  }

}


module.exports = userController;

