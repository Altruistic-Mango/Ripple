var Event = require('../Models/Event.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

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
      userId: data.userId,
      radius: radius
    };
    var node = gpsController.getNodes(searchParams);
    console.log('these are nearby users in qtree ' + JSON.stringify(node.children));
    var recipients = gpsController.calculateDist(searchParams, node.children);
    // recipients = recipients.map(function(user) {
    //   // get distance calculation true/false
    //   return user.userId;
    // });

    console.log('recipients mapped by gps controller and calculate distance are ' + recipients);

    var eventItem = {
        photoId: photoId,
        TTL: TTL,
        radius: radius,
        timestamp: timestamp
    };

    Event.create({
      x: searchParams.x,
      y: searchParams.y,
      userId: userId,
      photoId: photoId,
      TTL: TTL,
      timestamp: timestamp,
      radius: radius
    }, function(err, event) {
      if (err) {
        console.log(err);
        return err;
      }

      else {
        console.log('Event created');

      }
    });

    console.log('calling events callback')
    cb(photoId, recipients, eventItem, function(recipients) {
      recipients.forEach(function(recipient) {
        console.log('recipient is a ' + typeof recipient);
          userController.updateInbox(recipient, eventItem);
        });
    });
  },

  broadcastEvent: function(req, res) {
    console.log('broadcast event request body = ', req.body);
    var photoId = req.body.photoId;
    this.broadcast(req.body, function(photoId, recipients, eventItem, cb) {
      Photo.findOne({photoId: photoId}, function(err, photo) {
        if (err) {
          console.log(err);
        }
        else if (photo) {
          console.log('finding recipientList');
          console.log(photo.recipientList);
          var recipientList = [];

          recipients.forEach(function(userId) {
            if (photo.recipientList.indexOf(userId) === -1) {
              console.log('adding user to photo recipient list');
              recipientList.push(userId);
            }
            else {
              console.log(userId);
            }

          });
          photo.recipientList = photo.recipientList.concat(recipientList);
          photo.save();
          cb(recipientList, eventItem);
          res.end();
        }
        else {
          console.log('photo not found');
          res.send('photo not found');
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
