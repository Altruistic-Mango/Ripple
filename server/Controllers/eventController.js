var Event = require('../Models/Event.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var db = require('../db.js');
var Promise = require('bluebird');
var Q = require('q');

var eventController = {


  broadcast: function(data, cb) {
    console.log('called broadcast : ' + JSON.stringify(data));
    var photoId = data.photoId;
    var timestamp = data.timestamp;
    var userId = data.userId;
    var TTL = +data.TTL;
    var radius = +data.radius;

    var searchParams = {
      x: +data.x,
      y: +data.y,
      userId: data.userId
    };
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
      timestamp: timestamp,
      radius: radius,
      recipientList: recipients
    }, function(err, event) {
      if (err) {
        console.log(err);
        return err;
      }

      else {
        // enter the photo object to the user's inbox array
          // for each loop to enter object
          recipients.forEach(function(recipient) {
            userController.updateInbox(recipient, eventItem);
          });
      }
    });
    console.log('calling events callback');
    cb(photoId, recipients);
  },

  signUrl: function(req, res) {
    aws.getS3Policy(req, res);
  },

  broadcastEvent: function(req, res) {
    var photoId = req.body.photoId;
    var recipients;
    this.broadcast(req.body, function(photoId, recipients) {
      Photo.findOne({photoId: photoId}, function(err, photo) {
        if (err) {
          console.log(err);
        }
        else if (photo) {
          console.log('finding recipientList');
          console.log(photo.recipientList);
          var recipientList = photo.recipientList;
          recipients.forEach(function(userId) {
            if (recipientList.indexOf(userId) === -1) {
              console.log('adding user to photo recipient list');
              recipientList.push(userId);
            }
          });
          photo.recipientList = recipientList;
          photo.save();
          res.end();
        }

      });
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
  },

};


module.exports = eventController;
