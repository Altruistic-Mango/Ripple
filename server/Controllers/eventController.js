// The event controller handles all events broadcast by users. It will perform the bulk of the work when a photo is taken or rebroadcast, 
// and will log all broadcast events into the database. It makes use of the GPS and User Controllers to perform its functions and a can retrieve information 
// from the photo objects.

var Event = require('../Models/Event.js');
var gpsController = require('../Controllers/gpsController.js');
var userController = require('../Controllers/userController.js');
var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var eventController = {

// this broadcast function handles all broadcast events. It takes in a request from the client, either directly or through the photo controller, and 
// checks the quadtree to find the recipient nodes for a broadcast given the broadcast's range.

  broadcast: function(req, res) {
    var photoId = req.body.photoId;
    var timestamp = req.body.timestamp;
    var userId = req.body.userId;
    var TTL = +req.body.TTL * 60000;
    var radius = +req.body.radius; 
    var caption = req.body.caption || "";

    var searchParams = {
      x: +req.body.x,
      y: +req.body.y,
      userId: userId,
      radius: +radius
    };

    userController.insertBroadcastItem(userId, photoId, caption);
    console.log('calling gps controller and getting nodes')
    var tree = gpsController.getNodes(searchParams);
    var nodes = tree.traverse();

    // the recipients are filtered by the gps controller's calculate distance function, using the Haversine formula
    var recipients = gpsController.calculateDist(searchParams, nodes);

    var eventItem = {
        photoId: photoId,
        TTL: TTL,
        radius: radius,
        timestamp: timestamp,
        caption: caption
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

    // Using the bluebird library, we will create a promise object that will be resolved only when the photo query and event creation events are complete
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

        // here we begin checking the photo object to remove any users who have already received the photo. If the users are not in the photo recipient list,
        // they will be added to that list and entered into the event object before saving as having received the broadcast. If they have already received the 
        // photo, they will not receive it again and will not be added either the photo object or the event object as a recipient.
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
    // the recipients will now have their inbox updated with the newly broadcast photo, and will have the inbox sent to them via the user controller.
    .then(function(data) {
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
