var User = require('../Models/User.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var userController = {

  // This function will generate a unique user ID for a user on signup.
  generateUserId: function() {
    var id = "";
    while (id.length < 7) {
      id += Math.floor(Math.random() * (10 - 1) + 1);
    }
    return id;
  },

  // This function saves a new user into the database and encrypts that user's password.
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
          else {
            newUser.newUser = true;
            res.status(200).send(newUser);
          }
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

  // This signup function can be used for users who sign up through the app or using their facebook accounts to authenticate. Depending on the size
  // of the password, the server will determine which method the client used to authenticate, and reacts appropriately.
  signinUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    this.getUserFromDB({
      username: req.body.username
    }, function(user) {
      if (user && user.password.length > 20) {
        var hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function(err, match) {
          if (err) {
            return (err);
            console.log('error');
          }
          else if (match) {
            console.log('a match');
            res.status(200).send(user);
          } else {
            console.log('not a match');
            var resError = {errorCode: "password"}
            res.status(500).send(resError);
          }
        });
      } 
      else if (user) {
         console.log('not a match');
          var resError = {errorCode: "password"}
          res.status(500).send(resError);
      }
      else {
        console.log('user not found');
        var resError = {errorCode: 'username'}
        res.status(500).send(resError);  
      }
    });
  },

// The facebook sign in function checks the user's access token that is sent by facebook against the user record in the database. If the user
// does not exist, this function will create him or her.
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

// this function is used by other functions in the user controller to retrieve a user by userid, username or facebook access token when logging in.
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

  // this function takes in an event object from the event controller, and either updates the inbox and returns the inbox to be sent to the client,
  // or simply returns the inbox to the client if no event object is passed in. It also performs checks to be sure that no event broadcast is added
  // to the inbox more than once, and that there are no expired items in the user's inbox.

  updateInbox: function(userId, eventObj, cb) {

    if (eventObj && eventObj.photoId) {
      var caption = eventObj.caption || "";
          var broadcastEvent = {
            photoId: eventObj.photoId,
            TTL: eventObj.TTL,
            radius: eventObj.radius,
            timestamp: eventObj.timestamp,
            caption: caption
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
        // any items that have expired do not remain in the inbox, depending on the time to live on the event and the current time
        var newInbox = user.inbox.reduce(function(acc, inboxItem) {
 

          var diff = eventObj.timestamp - inboxItem.timestamp;
          if (diff < inboxItem.TTL) {
            acc.push(inboxItem);
          }
          return acc;
        }, []);

        // this function will check the current inbox to ensure that no duplicates are entered into the user's inbox
        if (broadcastEvent) {
          var bool = true;
          newInbox.reduce(function(bool, eventItem) {
            if (bool && eventItem.photoId !== eventObj.photoId) {
              return true;
            } else return false;
          }, true);

          if (bool) {
            newInbox.push(broadcastEvent);
            user.inbox = newInbox;
            user.save();
          }

        }
        // save the inbox to the user object in the database
        user.update({
          inbox: newInbox
        }, function(err, data) {
          console.log('sending user the inbox');
          cb(user.inbox);
        });
      }
      else cb(null);
    })
  },

  // this function is triggered by the client's saving a broadcast item to their album for later viewing
  insertBroadcastItem: function(userId, photoId, caption) {
    User.findOneAndUpdate({userId: userId}, {$push: {album: {photoId: photoId, caption: caption}}}, function(error, user){
      if (error) console.log(error);
      else console.log('item added to ' + user.username);
    })
  },

  // this function will clear out a user's inbox entirely.
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
    console.log('addToAlbum: ', JSON.stringify(req.body));
    User.findOneAndUpdate({userId: req.body.userId}, {$push: {album: {photoId: req.body.photoId, caption: req.body.caption}}}, function(error, user){
      if (error) {
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  },

  // this function clears out a user's album entirely
  cullAlbum: function(req, res, userId, photoId) {
    var query = {
      userId: userId
    }

    User.findOne(query, function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } 

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
        res.status(200).send();
      }
    });
  },

  // 
  getAlbum: function(req, res) {
    console.log('USERID: ', req.params.userId);
    var userId = req.params.userId;
    User.findOne({userId: userId}, function(error, user){
      if (error) {
        res.status(500).send();
      } else if (user) {
        console.log('USER.ALBUM: ', user.album);
        res.status(200).send(user.album);
      }
      else {
        console.log('User not found');
        res.status(500).send('User not found');
      }
    });
  },

  getInbox: function(req, res) {
    var userId = req.params.userId;
    User.findOne({userId: userId}, function(error, user){
      if (error) {
        res.status(500).send();
      } else if (user) {
        console.log('USER.INBOX: ', user.inbox);
        res.status(200).send(user.inbox);
      }
      else {
        console.log('User not found');
        res.status(500).send('User not found');
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

