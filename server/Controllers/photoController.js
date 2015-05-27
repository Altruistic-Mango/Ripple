/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var eventController = require('../Controllers/eventController.js');
var Q = require('q');

var photoController = {

  storePhoto: function(req, res) {

    var data = {
      userId: req.body.userId,
      photoId: req.body.photoId,
      timestamp: +req.body.timestamp || 5000,
      radius: +req.body.radius,
      TTL: +req.body.TTL,
      photoURL: req.body.photoURL || "http://localhost/",
    };

    Photo.findOne({photoId: data.photoId}, function(err, photo) {
        if (err) console.log(err);
        
        else if (photo) {
            console.log('Photo already exists');
            res.send(500);
        }

        else {
          console.log('creating photo now');
          Photo.create(data, function(err, result) {
            if (err) {
              res.send(500, err);
            }

            else {
              console.log('photo saved');
              eventController.broadcastEvent(req, res);
            }
          })
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
