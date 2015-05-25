var express = require('express');
var router = express.Router();

var userController = require('../Controllers/userController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET the list of users in the database*/
router.get('/list', function(req, res) {
  console.log('listing users');
  userController.retrieveUsers(req, res);
});

/*POST a new user to the database*/
router.post('/signup', function(req, res) {
  console.log('got signup request');
  userController.signupUser(req, res)
});

router.post('/signin', function(req, res) {
  console.log('got signin request');
  userController.signinUser(req, res)
});

module.exports = router;
