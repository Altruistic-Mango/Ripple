/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var eventController = require('../Controllers/eventController.js');
var userController = require('../Controllers/userController.js');


var photoController = {

// The store photo function is used whenever a new photo is taken by the client and shared. The photo metadata is created and saved to the database
// after the photo has been uploaded to the Amazon S3 bucket. Once the photo metadata is saved, the storePhoto function calls the broadcast event function
// on the event Controller, which starts the process of updating all of the local users' inboxes with the photo.

  storePhoto: function(req, res) {
    console.log(JSON.stringify(req.body));
    var TTL = +req.body.TTL * 60000;
    var userId = req.body.userId;
    var photoId = req.body.photoId;
    var caption = req.body.caption;
    var data = {
      photoId: photoId,
      radius: +req.body.radius,
      TTL: TTL,
      timestamp: +req.body.timestamp,
      userId: userId,
      recipientList: [userId],
      caption: caption
    };
    Photo.findOne({
      photoId: photoId
    }, function(err, photo) {
      if (err) {
        console.log(err);
      }  else if (photo) {
        console.log('Photo already exists');
        res.send(photo);
      } else {
        Photo.create(data, function(err, result) {
        console.log('creating photo now');
          if (err) {
            console.log('error creating photo: ', err);
            res.send(500, err);
          } else {
            console.log('photo saved');
            eventController.broadcast(req, res);
          }
        });
      }
    });
  },

  getPhotos: function(req, res) {
    Photo.find({}, function(err, data) {
      if (!err) {
        res.send(200, data);
      } else {
        throw err;
      }
    });
  },


  testingFunc: function(req, res) {
    res.status(200);
    res.end();
  },

  deletePhoto: function(req, res) {
    var userId = req.body.userId;
    var photoId = req.body.photoId;
    userController.cullInbox(userId, photoId);
    res.end();
  },

  deleteAlbumPhoto: function(req, res) {
    var userId = req.body.userId;
    var photoId = req.body.photoId;
    userController.cullAlbum(req, res, userId, photoId);
  }
};

module.exports = photoController;
