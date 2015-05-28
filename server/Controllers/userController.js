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

  retrieveUsers: function(req, res, cb) {
    User.find({}, function(err, data) {
      if (!err && cb) { 
          cb(data);
      } 
      else if (err) throw err;
      else {
        res.send(data);
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
          if (cb) {
            cb(person);
          }
          else {
            console.log('User already exists');
            return 'User already exists';
          }
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
        var newInbox = user.inbox.reduce(function(acc, inboxItem) {
            console.log(acc);
            if (inboxItem.TTL > 50) {
              acc.push(inboxItem);
            }
            return acc;
          }, []);

        user.inbox = newInbox;
        user.update({inbox: newInbox}, function(err, data) {
          console.log(data);
          return data;
        });
      }
      else return null;
    })
  },

  cullInbox: function(userId, cb) {
    
    User.findOne({userId: userId}, function(err, users) {
      if (err) console.log(err);
      
      else {
        users.forEach(function(user) {
          var newInbox = user.inbox.reduce(function(acc, inboxItem) {
            console.log(acc);
            if (inboxItem.TTL > 50) {
              acc.push(inboxItem);
            }
            return acc;
          }, []);

          user.inbox = newInbox;
          user.save();
        })
      }
    })
    res.end();
  },

};


module.exports = userController;

