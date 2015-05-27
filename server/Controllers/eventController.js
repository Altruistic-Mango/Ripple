var Event = require('../Models/Event.js');
var Photo = require('../Models/Photo.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var mongoose = require('mongoose');
var db = require('../db.js');
var Promise = require('bluebird');
var Q = require('q');

var eventController = {

  broadcast: function(data, cb) {
    console.log(data);
    var photoId = data.photoId;
    var userId = +data.userId;
    var searchParams = {
      x: +data.x, 
      y: +data.y,
      username: data.userId
    };

    var TTL = +data.TTL;
    var radius = +data.radius;

    var nodes = gpsController.getNodes(searchParams);

    var recipients = nodes.map(function(user) {
      return user.userId;
    });

    var eventItem = {
        photoId: photoId,
        TTL: TTL,
        radius: radius
    };

    Event.create({
      userId: userId,
      photoId: photoId,
      TTL: TTL,
      radius: radius,
      photoURL: data.photoURL,
      recipientList: recipients
    }, function(err, event) {
      if (err) {
        console.log(err);
        return err;
      }

      else {
        // enter the photo object to the user's inbox array
          // for each loop to enter object
          console.log('event is ' + event);
          recipients.forEach(function(recipient) {
            console.log(recipient);
            userController.updateInbox(recipient, eventItem);
          });
      }
    });
    cb(200);
  },

  broadcastEvent: function(req, res) {
    var result = this.broadcast(req.body, function() {
    res.send(200);  
    });
  },

  getEvents: function(req, res) {
    Event.find({}, function(err, event) {
      if (err) {
        console.log(err);
        res.send(err);
      }

      else if (event) {
        console.log(event);
        res.json(event);
      }

    });
  }

};



module.exports = eventController;
