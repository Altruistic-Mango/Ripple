var express = require('express');
var router = express.Router();
var dashboardController = require('../Controllers/dashboardController.js');

router.get('/photos', function(req, res) {
  console.log('get req to photos recd');
  dashboardController.fetchPhotos(req, res);
});

module.exports = router;