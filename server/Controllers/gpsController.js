var Quadtree = require('../Utils/QTree.js');
var quadtree = new Quadtree()

var gpsController = {

  insertCoords: function(req, res) {

    var node = {
      x: +req.body.x, 
      y: +req.body.y, 
      username: req.body.username
    }

    quadtree.put(node);
    res.send('Entered node')
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
}

module.exports = gpsController;