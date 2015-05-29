/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var eventController = require('../Controllers/eventController.js');
var Q = require('q');

var photoController = {

  storePhoto: function(req, res) {

    // incoming photo: '{"userId: "", "photoId": "", "timestamp": "", "x":"", "y": "", "radius": "", "TTL":""}'

    var photoId = req.body.photoId;
    var data = {
      photoId: photoId,
      radius: +req.body.radius,
      TTL: +req.body.TTL
    };

    Photo.findOne({
      photoId: photoId
    }, function(err, photo) {
      if (err) console.log(err);

      else if (photo) {
        console.log('Photo already exists');
        res.send(500);
      } else {
        console.log('creating photo now');
        Photo.create(data, function(err, result) {
          if (err) {
            res.send(500, err);
          } else {
            console.log('photo saved');
            eventController.broadcastEvent(req, res);
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
  }
};

module.exports = photoController;
