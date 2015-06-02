var express = require('express');
var router = express.Router();
var eventController = require('../Controllers/eventController.js');

router.post('/broadcast', function(req, res) {
  console.log('user broadcast');
  eventController.broadcast(req, res);
});

router.post('/getEvents', function(req, res) {
  console.log('getting events');
  eventController.getEvents(req, res);
});

module.exports = router;
