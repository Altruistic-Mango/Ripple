var Photo = require('../Models/Photo.js');

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
  }


};

module.exports = dashboardController;
