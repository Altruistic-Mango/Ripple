var express = require('express');
var router = express.Router();
var gpsController = require('../Controllers/gpsController.js')

router.post('/position', function(req, res) {
  console.log('adding new GPS data');
  gpsController.insertCoords(req, res);
});

router.post('/getlocal', function(req, res) {
  console.log('getting nearby nodes');
  gpsController.findNearbyNodes(req, res);
});

module.exports = router;