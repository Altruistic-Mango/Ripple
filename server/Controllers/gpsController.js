var quadtree = require('../Utils/QTree.js');


var gpsController = {

  insertCoords: function(req, res) {

    var node = {
      x: +req.body.x, 
      y: +req.body.y, 
      username: req.body.username
    };

    quadtree.update(node);
    res.send('Entered node');
  },

  findNearbyNodes: function(req, res) {
    
    var searchParams = {
      x: req.body.x, 
      y: req.body.y,
      username: req.body.username
    };

    var nodes = quadtree.get(searchParams);
    res.send(nodes);
  }
};


module.exports = gpsController;