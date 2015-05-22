var express = require('express');
var router = express.Router();

var userController = require('../Controllers/userController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function(req, res, next) {
  console.log('listing users');
  userController.retrieveUsers();
});

module.exports = router;
