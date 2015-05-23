var quadtree = require('simple-quadtree');

var gpsController = {

  insertCoords: function(req, res) {

    console.log(req.body);

    xCoord = req.body.x;
    yCoord = req.body.y;
    
    
  },

  findNearbyNodes: function(req, res) {

  }
}

module.exports = gpsController;