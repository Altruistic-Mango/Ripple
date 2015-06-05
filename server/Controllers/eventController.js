var Event = require('../Models/Event.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var eventController = {


  broadcast: function(req, res) {
    var photoId = req.body.photoId;
    var timestamp = req.body.timestamp;
    var userId = req.body.userId;
    var TTL = +req.body.TTL * 60000;
    var radius = +req.body.radius;

    var searchParams = {
      x: +req.body.x,
      y: +req.body.y,
      userId: userId,
      radius: +radius
    };
    console.log('calling gps controller and getting nodes')
    var tree = gpsController.getNodes(searchParams);
    var nodes = tree.traverse();
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
        var photoRecipientList = [];
        var eventRecipientList = [];

        data.event.recipientList.forEach(function(user) {
          if (data.photo.recipientList.indexOf(user.userId) === -1) {
            photoRecipientList.push(user.userId);
            eventRecipientList.push(user);
            console.log('pushed ' + user.userId);
          }
        });

        data.photo.recipientList = data.photo.recipientList.concat(photoRecipientList);
        data.event.recipientList = eventRecipientList;
        data.photo.save();
        data.event.save();
        return data;
      }, function(err) {
          console.log(err);
          res.send('photo not found');
      })
    .then(function(data) {
      console.log('data is \n' + JSON.stringify(data))
      data.event.recipientList.forEach(function(recipient) {
        userController.updateInbox(recipient.userId, data.event);
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
