/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var eventController = require('../Controllers/eventController.js');
var Q = require('q');

var photoController = {

  storePhoto: function(req, res) {

    // incoming photo: '{"userId: "", "photoId": "", "timestamp": "", "x":"", "y": "", "radius": "", "TTL":""}'
// curl -H "Content-Type:application/json" -X POST -d '{"userId: "9651598", "photoId": "11111111", "timestamp": "1432937843430", "x":"-122.4093594", "y": "37.783795", "radius": "10000", "TTL":"100000000"} http://localhost:3000/photos/newPhoto
// {userId: "9651598", y: 37.783795, x: -122.4093594, timestamp: 1432937843430}

    console.log(JSON.stringify(req.body));
    var userId = req.body.userId;
    var photoId = req.body.photoId;
    //TODO: Change TTL, will be received as milliseconds
    var data = {
      photoId: photoId,
      radius: +req.body.radius,
      TTL: +req.body.TTL,
      timestamp: +req.body.timestamp,
      userId: userId,
      recipientList: [userId]
    };

    Photo.findOne({
      photoId: photoId
    }, function(err, photo) {
      if (err) console.log(err);

      else if (photo) {
        console.log('Photo already exists');
        res.send(photo);
      } else {
        console.log('creating photo now');
        Photo.create(data, function(err, result) {
          if (err) {
            console.log(err);
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
  }
};

module.exports = photoController;
