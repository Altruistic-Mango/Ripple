var quadtree = require('../Utils/QTree.js');
var userController = require('../Controllers/userController.js');

    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
      return this * Math.PI / 180;
      };
    }

var gpsController = {

  // insert Coords will receive the user's coordinates to insert into the quadtree and return the contents of the user's inbox.
  insertCoords: function(req, res) {

    if (quadtree.inBounds(req.body)) {
    console.log('in bounds yes!');
    var userId = req.body.userId;


    var timestamp = new Date().getTime();

    var node = {

      x: +req.body.x,
      y: +req.body.y,
      userId: userId

    };

      quadtree.update(node);

      node.timestamp = timestamp;


      userController.retrieveInbox(userId, node, function(inbox) {
        res.send(inbox);
      });
    }
    else {
      console.log('out of bounds')
      res.send('Out of bounds');
    }
  },

  // this function takes a request from the user and returns the quadrant that contains the nodes. 
  findNearbyNodes: function(req, res) {

    var searchParams = {
      x: req.body.x,
      y: req.body.y,
      userId: req.body.userId,
      radius: +req.body.radius
    };


    var tree = this.getNodes(searchParams);

    // because no callback is passed into this function, the nodes are collected and returned
    var nodes = tree.traverse();
    
    // to be sent to the user
    res.send(nodes);

  },

  // this function will traverse through the entire quadtree and delete any nodes that are past their expiration, and is executed every two minutes
  pruneTree: function() {
    var timestamp = new Date().getTime();
    quadtree.clearOut(timestamp);
    var self = this;
    setTimeout(function() {
      self.pruneTree();
    }, 120000);
  },

  // This will get the distance between two coordinates

  calculateDist: function(item1, nodes) {

    // let's remove the node that initiated the broadcast before checking for nearby coordinates
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].userId === item1.userId) nodes.splice(i, 1);
    }


    // The haversine formula is used to calculate the distance between two points, factoring in the spherical shape of the Earth
    var R = 6371;
    nodes = nodes || this.getNodes(item1);
    var lat1 = +item1.x;
    var lon1 = +item1.y;
    var lat2, lon2, dlat, dlon;
    var result = [];

    nodes.forEach(function(item2) {
      lat2 = +item2.x;
      lon2 = +item2.y;
      dLat = (lat2 - lat1).toRad();
      dLon = (lon2 - lon1).toRad();
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      console.log(c);
      var d = R * c;
      d = d * 0.621371;
      // console.log(d);

      if (d < item1.radius) {
        result.push({userId: item2.userId, y: item2.y, x: item2.x});
      }
    });
    return result;
  },

  // Find nodes in Quadtree
  getNodes: function(searchParams) {
    var node = quadtree.get(searchParams);
    return node;
  },

  // Invoke calculate distance function
  getDist: function(req, res) {
    var result = this.calculateDist(req.body);
    res.send(result);
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

  // load dummy data for testing, in this case one million coordinate points
  loadData: function(req, res) {
    var date = new Date();

    var randIntx = function() {
      return Math.random() * (125.3 - 67.8) - (125.3);
    };
    
    var randInty = function() {
      return Math.random() * (67.5 - 10) + 10;
    }
    
    var count = 0;
    
    while (count < 1000000) {
      var item = {};
      item.x = randIntx();
      item.y = randInty();
      item.timestamp = date;
      item.userId = Math.floor(Math.random() * 9999999);
      quadtree.put(item);
      count++;
    };
    res.end();
  },

};

module.exports = gpsController;
