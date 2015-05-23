var express = require('express');
var router = express.Router();
var gpsController = require('../Controllers/gpsController.js')

router.post('/newdata', function(req, res) {
  console.log('adding new GPS data');
  gpsController.insertCoords(req, res);
});

router.get('/getlocal', function(req, res) {
  console.log('getting nearby nodes');
  gpsController.findNearbyNodes(req, res);
});

module.exports = router;