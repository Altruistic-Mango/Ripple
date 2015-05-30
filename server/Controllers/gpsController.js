var quadtree = require('../Utils/QTree.js');
var queue = require('../Utils/Queue.js');
var userController = require('../Controllers/userController.js');

    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
      return this * Math.PI / 180;
      };
    }

var gpsController = {

  // this will insert a coordinate to the quadtree for insertion
  insertCoords: function(req, res) {


    var userId = req.body.userId;

    console.log('inserting coordinates ' + typeof userId);

    var timestamp = new Date().getTime();

    var node = {
      x: +req.body.x,
      y: +req.body.y,
      userId: userId
    };
    queue.insert(node);
    quadtree.update(node);

    node.timestamp = timestamp;


    var inbox = userController.retrieveInbox(userId, node, function(inbox) {
      console.log(inbox);
      res.send(inbox);
      });
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
    res.send(nearbyNodes.children);
  },

  // This will get the distance between two coordinates
  calculateDist: function(item1, nodes) {

    var R = 6371;
    nodes = nodes || this.getNodes(item1);
    var lat1 = +item1.x;
    var lon1 = +item1.y;
    var lat2, lon2, dlat, dlon;
    console.log('type of radius = ' + typeof item1.radius);
    var result = [];

    nodes.forEach(function(item2) {
      lat2 = item2.x;
      lon2 = item2.y;
      dLat = (lat2 - lat1).toRad();
      dLon = (lon2 - lon1).toRad();
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      d = d * 0.621371;
      console.log(d);

      if (d < item1.radius) {
        result.push(item2.userId);
      }
    });
    console.log('result = ' + result);
    return result;
  },

  // Find nodes in Quadtree
  getNodes: function(searchParams) {
    console.log('getNodes searchParams are + ' + searchParams);
    var nodes = quadtree.get(searchParams);
    return nodes;
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

  // load dummy data for testing
  loadData: function(req, res) {
    quadtree.addData();
    res.end();
  },

  listQueue: function(req, res) {
    res.send(queue.listQueue());
  },

  deleteNodes: function(req, res) {
    var self = this;
    setTimeout(function() {
      var item = queue.cleanUp();
      if (item) {
        console.log('got item');
        self.removeNode(item);
      }
      self.deleteNodes(req, res);
    }, 1000);
  },

};

module.exports = gpsController;
