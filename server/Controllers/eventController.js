var Event = require('../Models/Event.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var eventController = {


  broadcast: function(data, res) {
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
    console.log(searchParams)
    var recipients = gpsController.calculateDist(searchParams, nodes);

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
      recipientList: recipients
    });

    Promise.props({
      photo: Photo.findOne({photoId: photoId}),
      event: Event.create({
        x: searchParams.x,
        y: searchParams.y,
        userId: userId,
        photoId: photoId,
        TTL: TTL,
        timestamp: timestamp,
        radius: radius,
        recipientList: recipients
      })
    })
    .then(function(data) {
      console.log('Event created, calling events callback with photo' + data.photo + 
        '\nevent ' + data.event);
        console.log(data.photo.recipientList);
        var recipientList = [];

        data.event.recipientList.forEach(function(userId) {
          if (data.photo.recipientList.indexOf(userId) === -1) {
            recipientList.push(userId);
          }
          else {
            console.log(userId);
          }
        });

        data.photo.recipientList = data.photo.recipientList.concat(recipientList);
        data.photo.save();
        return data.event
      },function(err) {
          console.log(err);
          res.send('photo not found');
      })  
    .then(function(data) {
      data.recipientList.forEach(function(recipient) {
        userController.updateInbox(recipient, data.event);
      });
    res.end();
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
