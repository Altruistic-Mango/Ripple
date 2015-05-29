var express = require('express');
var router = express.Router();
var gpsController = require('../Controllers/gpsController.js');

router.post('/position', function(req, res) {
  console.log('adding new GPS data');
  gpsController.insertCoords(req, res);
});

router.post('/getlocal', function(req, res) {
  console.log('getting nearby nodes');
  gpsController.findNearbyNodes(req, res);
});

router.post('/distance', function(req, res) {
  console.log('getting distance');
  gpsController.getDist(req, res);
});

router.get('/postdata', function(req, res) {
  console.log('posting data');
  gpsController.loadData(req, res);
});

router.post('/remove', function(req, res) {
  console.log('removing item');
  gpsController.initRemove(req, res);
});

router.get('/timeout', function(req, res) {
  console.log('calling set timeout');
  gpsController.deleteNodes(req, res);
})

module.exports = router;
