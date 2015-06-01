var Event = require('../Models/Event.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var eventController = {


  broadcast: function(data, cb) {
    console.log('called broadcast : ' + JSON.stringify(data));
    var photoId = data.photoId;
    var timestamp = data.timestamp;
    var userId = data.userId;
    var TTL = data.TTL;
    var radius = data.radius;

    var searchParams = {
      x: +data.x,
      y: +data.y,
      userId: userId,
      radius: radius
    };
    var tree = gpsController.getNodes(searchParams);
    var nodes = tree.traverse();
    var recipients = gpsController.calculateDist(searchParams, nodes);

    console.log('recipients mapped by gps controller and calculate distance are ' + recipients);

    var eventItem = {
        photoId: photoId,
        TTL: TTL,
        radius: radius,
        timestamp: timestamp
    };

    var event = new Event({
      x: searchParams.x,
      y: searchParams.y,
      userId: userId,
      photoId: photoId,
      TTL: TTL,
      timestamp: timestamp,
      radius: radius,
      recipientList: node.children
    });


    event
    .saveAsync()
    .then(function(data) {
      console.log('Event created, calling events callback with photoId' + data.photoId + 
        '\nrecipients ' + data.recipientList);
        
      Promise.resolve(Photo.findOne({photoId: photoId}).exec())
    .then(function(photo) {
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
      },function(err) {
          console.log(err);
          res.send('photo not found');
      })  
    .then(function(recipients) {
      recipients.forEach(function(recipient) {
      console.log('recipient is a ' + typeof recipient);
        userController.updateInbox(recipient, eventItem);
      });
    res.end();
    });
  })  
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

  updateRecipients

};


module.exports = eventController;
