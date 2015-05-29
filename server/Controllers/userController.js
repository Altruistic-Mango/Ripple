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
        id += Math.floor(Math.random() * (10 - 1) + 1);
      }
      return id;
    };

    var user = this.getUserFromDB({
      username: req.body.username
    });
    if (!user) {
      var newUser = new User({
        username: username,
        password: password,
        userId: randInt(),
      });
      newUser.save(function(err, newUser) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).end();
      });
    } else {
      console.log('Account already exists');
      res.status(500).end();
    }
  },

  retrieveUsers: function(req, res, cb) {
    User.find({}, function(err, data) {
      if (!err && cb) {
        cb(data);
      } else if (err) throw err;
      else {
        res.send(data);
      }
    });
  },

  signinUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var user = this.getUserFromDB({
      username: req.body.username
    }, function(user) {

      if (!user) {
        console.log('user not found');
        res.status(500).end();
      } else {
        var hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function(err, match) {
          if (err) return (err);
          console.log(match);
          if (match) {
            res.status(200).send(user);
          } else {
            console.log('not a match');
            res.status(500).end();
          }
        });
      }
    });
  },

  getUserFromDB: function(person, cb) {
    if (person.uuId) {
      User.findOne({
        uuId: person.uuId
      }, function(err, person) {
        if (err) console.log(err);
        else if (person) {
          return person;
        } else return null;
      });
    } else if (person.username) {
      User.findOne({
        username: person.username
      }, function(err, person) {
        if (err) console.log(err);
        else if (person) {
          if (cb) {
            cb(person);
          } else {
            console.log('User already exists');
            return 'User already exists';
          }
        } else return null;
      });
    }
  },

  updateInbox: function(userId, eventObj) {
    this.retrieveInbox(userId, eventObj, function(inbox) {
      console.log('inbox ==== ' + inbox);
    });
  },

  retrieveInbox: function(userId, eventObj, cb) {
    User.findOne({
      userId: userId
    }, function(err, user) {

      if (err) {
        console.log(err);
        return err;
      } 

      else if (user) {
        var newInbox = user.inbox.reduce(function(acc, inboxItem) {
          console.log('removing items from inbox');
          if (eventObj.timestamp - inboxItem.timestamp < inboxItem.TTL) { // check whether eventObj.timestamp - inboxItem.timestamp < TTL
            console.log('inboxItem ' + inboxItem + ' passed the test')
            acc.push(inboxItem);
          }
          return acc;
        }, []);

        if (eventObj && eventObj.photoId) {
          var broadcastEvent = {
            photoId: eventObj.photoId,
            TTL: eventObj.TTL,
            radius: eventObj.radius,
            timestamp: eventObj.timestamp
          };

          var bool = true;

          newInbox.reduce(function(bool, eventItem) {
            if (bool && eventItem.photoId !== eventObj.photoId) {
              return true;
            } else return false;
          }, true);

          if (bool) {
            console.log('check did not find a match in user inbox, saving');
            newInbox.push(broadcastEvent);
            user.inbox = newInbox;
            user.save();
          }
        }

        user.update({
          inbox: newInbox
        }, function(err, data) {
          cb(user.inbox);
        });

      } else return null;
    });
  },

  cullInbox: function(req, res) {
    var query = req.body.username ? {
      username: req.body.username
    } : {};
    User.find(query, function(err, users) {
      if (err) console.log(err);

      else {
        users.forEach(function(user) {
          var newInbox = [];

          user.inbox = newInbox;
          user.save();
        });
      }
    });
    res.end();
  },

};

module.exports = userController;

