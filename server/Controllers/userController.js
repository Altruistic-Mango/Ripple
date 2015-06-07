var User = require('../Models/User.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var userController = {

  generateUserId: function() {
    var id = "";
    while (id.length < 7) {
      id += Math.floor(Math.random() * (10 - 1) + 1);
    }
    return id;
  },

  signupUser: function(req, res) {

    var username = req.body.username;
    var password = bcrypt.hashSync(req.body.password);
    var email = req.body.email;
    var userId = this.generateUserId();

    this.getUserFromDB({
      username: req.body.username
    }, function(user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password,
          userId: userId,
          email: email
        });

        newUser.save(function(err, newUser) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }
          res.status(200).send(newUser);
        });
      } 
      else {
        console.log('Account already exists');
        var errorCode = {errorCode: "Account already exists."}
        res.status(500).send(errorCode);
        }
      })
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

    this.getUserFromDB({
      username: req.body.username
    }, function(user) {

      if (user) {
        var hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function(err, match) {
          if (err) return (err);
          if (match) {
            res.status(200).send(user);
          } else {
            console.log('not a match');
            var resError = {errorCode: "password"}
            res.status(500).send(resError);
          }
        });
      } else {
        console.log('user not found');
        var resError = {errorCode: 'username'}
        res.status(500).send(resError);  
      }
    });
  },

  fbSignin: function(req, res) {
    var self = this;
    var fbId = +req.body.password;
    console.log(JSON.stringify(req.body));
    this.getUserFromDB({
    password: fbId
    }, function(user) {
      if (user) {
        res.status(200).send(user);
        }
      else if (!user && req.body.username) {
        console.log('no user found');
        var userId = self.generateUserId();
        var email = req.body.email || "";
        newUser = new User({
          username: req.body.username,
          password: fbId,
          userId: userId,
          email: email
        });
        
        newUser.save(function(err, newUser) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }
          res.status(200).send(newUser);
        });
      }
      else {
        var errorCode = {errorCode: 'user'};
        res.status(500).send(errorCode);
      }
    })
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
        } else cb(null);
      });
    }
    else if (person.password) {
      User.findOne({
        password: person.password
      }, function(err, person) {
        if (err) console.log(err);
        else if (person) {
          if (cb) {
            cb(person);
          } else {
            return user;
          }
        } else cb(null);
      });
    }
  },

  updateInbox: function(userId, eventObj) {
    this.retrieveInbox(userId, eventObj, function(inbox) {
      console.log('inbox = ' + inbox);
    });
  },

  retrieveInbox: function(userId, eventObj, cb) {

    if (eventObj && eventObj.photoId) {
          var broadcastEvent = {
            photoId: eventObj.photoId,
            TTL: eventObj.TTL,
            radius: eventObj.radius,
            timestamp: eventObj.timestamp
          };
        }

    User.findOne({
      userId: userId
    }, function(err, user) {

      if (err) {
        console.log(err);
        return err;
      }

      else if (user) {

        var newInbox = user.inbox.reduce(function(acc, inboxItem) {
          console.log('removing items from inbox. \n this is the event obj timestamp: ' + eventObj.timestamp +
            '\n this is the inboxItem timestamp: ' + inboxItem.timestamp + '\n this is the inboxItem.TTL : ' + inboxItem.TTL +
            '\n this is the difference: ' + (eventObj.timestamp - inboxItem.timestamp));

          var diff = eventObj.timestamp - inboxItem.timestamp;
          console.log(diff < inboxItem.TTL);
          if (diff < inboxItem.TTL) {
            console.log('inboxItem ' + inboxItem + ' passed the test')

            acc.push(inboxItem);
          }

          return acc;
        }, []);

        if (broadcastEvent) {
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
          console.log('sending user the inbox');
          cb(user.inbox);
        });
      }
      else return null;
    })
  },

  cullInbox: function(userId, photoId) {
    var query = {
      userId: userId
    }

    User.findOne(query, function(err, user) {
      if (err) console.log(err);

      else {
        if (user) {
          var inbox = user.inbox;
          for (var i = 0; i < inbox.length; i++) {
            if (user.inbox[i].photoId === photoId) {
              user.inbox.splice(i, 1);
              break;
            }  
          }
          user.inbox = inbox;
          user.save();
        };
      }
    });
  },

  addToAlbum: function(req, res) {
    console.log('addToAlbum: ', req.body);
    User.findOneAndUpdate({userId: req.body.userId}, {$push: {album: {photoId: req.body.photoId}}}, function(error, user){
      if (error) {
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  },

  cullAlbum: function(userId, photoId) {
    var query = {
      userId: userId
    }

    User.findOne(query, function(err, user) {
      if (err) console.log(err);

      else {
        if (user) {
          var album = user.album;
          for (var i = 0; i < album.length; i++) {
            if (user.album[i].photoId === photoId) {
              user.album.splice(i, 1);
              break;
            }  
          }
          user.album = album;
          user.save();
        };
      }
    });
  },

  getAlbum: function(req, res) {
    console.log('USERID: ', req.params.userId);
    var userId = req.params.userId;
    User.findOne({userId: userId}, function(error, user){
      if (error) {
        res.status(500).send();
      } else {
        console.log('USER.ALBUM: ', user.album);
        res.status(200).send(user.album);
      }
    });
  },

  getInbox: function(req, res) {
    var userId = req.params.userId;
    User.findOne({userId: userId}, function(error, user){
      if (error) {
        res.status(500).send();
      } else {
        console.log('USER.INBOX: ', user.inbox);
        res.status(200).send(user.inbox);
      }
    });
  },

  deleteInbox: function(req, res) {
    var userId = req.params.userId; 
    User.findOneAndUpdate({userId: userId}, {$set: {inbox : [] }}, { 'new' : true }, function(error, user){
      if (error) {
        res.status(500).send();
      } else {
        console.log('just cleared the users inbox: ', user.inbox);
        res.status(200).send(user.inbox);
      }
    });
  }

};

module.exports = userController;

