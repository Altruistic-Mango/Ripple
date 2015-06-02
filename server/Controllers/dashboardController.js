var Photo = require('../Models/Photo.js');
var Event = require('../Models/Event.js');

var dashboardController = {

  fetchPhotos: function(req, res) {
    console.log('dash controller fetchPhotos called');
    Photo.find({}, function(err, data) {
      if (!err) {
        console.log('sending photos: ', data);
        res.status(200).json(data);
      } else {
        throw err;
        res.send(500);
      }
    });
  },

  fetchEvents: function(req, res) {
    var photoId = req.params.photoId;
    Event.find({photoId: photoId}, function(error, photos) {
      if (error) res.status(500).send(); 
      res.status(200).json(photos);
    })
  }

};

module.exports = dashboardController;
