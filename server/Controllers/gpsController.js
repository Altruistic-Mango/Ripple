var quadtree = require('../Utils/QTree.js');
var userController = require('../Controllers/userController.js');


var gpsController = {


  // this will insert a coordinate to the quadtree for insertion
  insertCoords: function(req, res) {

    var node = {
      x: +req.body.x, 
      y: +req.body.y, 
      userId: req.body.userId
    }

    quadtree.update(node);
    var inbox = userController.retrieveInbox(node.userId)
    res.send(inbox);
  },

  // this function takes a request from the user and returns an array of nodes that are within the quadrant
  findNearbyNodes: function(req, res) {
    console.log(req.body);
    
    var searchParams = {
      x: req.body.x, 
      y: req.body.y,
      userId: req.body.userId
    };

    var nearbyNodes = this.getNodes(searchParams);
    res.send(nearbyNodes);
  },

  // This will get the distance between two coordinates
  calculateDist: function(item1) {

    var nodes = this.getNodes(item1);
    item1.x = Math.abs(item1.x);
    nodes.forEach(function(item2) {
    var hyp = Math.abs((item1.x + item2.x) * (item1.x + item2.x)) + 
              Math.abs((item1.y - item2.y) * (item1.y - item2.y));
    hyp = Math.sqrt(hyp);    
    });

    return hyp;
  },

  // Find nodes in Quadtree
  getNodes: function(searchParams) {
    var nodes = quadtree.get(searchParams);
    return nodes;
  },

  // Invoke calculate distance function
  getDist: function(req, res) {
    var result = this.calculateDist(req.body)
    res.send(result)
  },

  // remove nodes from quadtree if they match the item sent
  removeNode: function(item) {
    return quadtree.remove(item);
  },

  // initiate the removal function
  initRemove: function(req, res) {
    var item = this.removeNode(req.body);
    res.send(item);
  },

  // load dummy data for testing
  loadData: function(req, res) {
    quadtree.addData();
    res.end();
  },

};

module.exports = gpsController;