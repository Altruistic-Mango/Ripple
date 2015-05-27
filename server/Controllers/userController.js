var User = require('../Models/User.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');

var userController = {

signupUser: function(req, res) {  


  var username = req.body.username;
  var password = bcrypt.hashSync(req.body.password);
  var randInt = function() {
    var id = "";
    while (id.length < 7) {
      id +=  Math.floor(Math.random() * (10 - 1) + 1);
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
            res.end();
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
            res.send(user);
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

  updateInbox: function(userId, eventObj) {
    var query = {userId: userId};
    User.findOne(query, function(err, user) {
      if (err) {
        console.log(err);
      }

      else if (user) {

        var broadcastEvent = {
          photoId: eventObj.photoId,
          TTL: eventObj.TTL,
          radius: eventObj.radius
        };

        console.log('checking inbox now');
        var bool = true;
        user.inbox.reduce(function(bool, eventItem) {
          if (bool && eventItem.photoId !== eventObj.photoId) {
            return true;
          }  
          else return false;
        }, true)

        if (bool) {
            console.log('check did not find a match in user inbox, saving')
            user.inbox.push(broadcastEvent);
            user.save();
        }
        else return;
      }
    });
  },

  retrieveInbox: function(userId) {
    User.findOne({userId: userId}, function(err, user) {
      if (err) {
        console.log(err);
        return err;
      }
      else if (user) {
        return user.inbox;
      }
      else return null;
    })
  }

};


module.exports = userController;

