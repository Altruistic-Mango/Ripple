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
  userController.signupUser(req, res);
});
/* POST sign in an existing user*/
router.post('/signin', function(req, res) {
  console.log('got signin request');
  userController.signinUser(req, res);
});

router.post('/deleteUser', function(username) {
  console.log('deleting user');
  userController.deleteUser(username);
});

router.post('/clearInbox', function(req, res) {
  if (req.body.username) {
    console.log('clearing ' + req.body.username + '\'s inbox');
    userController.cullInbox(req, res);
  } else {
    console.log('clearing all inboxes');
    userController.cullInbox(req, res);
  }
});

router.get('/album/:userId', function(req, res) {
  console.log('getting album');
  userController.getAlbum(req, res);
});

router.post('/album', function(req, res) {
  console.log('adding another photo to album');
  userController.addToAlbum(req, res);
});

module.exports = router;
