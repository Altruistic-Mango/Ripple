/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var eventController = require('../Controllers/eventController.js');
var userController = require('../Controllers/userController.js');


var photoController = {

  storePhoto: function(req, res) {

    // incoming photo: '{"userId: "", "photoId": "", "timestamp": "", "x":"", "y": "", "radius": "", "TTL":""}'
// curl -H "Content-Type:application/json" -X POST -d '{"userId: "9651598", "photoId": "11111111", "timestamp": "1432937843430", "x":"-122.4093594", "y": "37.783795", "radius": "10000", "TTL":"100000000"} http://localhost:3000/photos/newPhoto
// {userId: "9651598", y: 37.783795, x: -122.4093594, timestamp: 1432937843430}
    // res();
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
