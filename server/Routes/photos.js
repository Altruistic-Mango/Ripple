var express = require('express');
var router = express.Router();
var photoController = require('../Controllers/photoController.js');

router.post('/newPhoto', function(req, res) {
  console.log('got request to store photo');
  photoController.storePhoto(req, res);
});

router.get('/getPhotos', function(req, res) {
  console.log('getting Photos');
  photoController.getPhotos(req, res);
});

router.get('/test', function(req, res) {
  console.log('Testing Route pinged');
  photoController.testingFunc(req, res);
});

router.post('/delete', function(req, res) {
	console.log('Deleting photo ' + req.body.photoId);
	photoController.deletePhoto(req, res);
});

router.post('/deleteFromAlbum', function(req, res) {
  console.log('req to delete photo from album ' + req.body.photoId);
  photoController.deleteAlbumPhoto(req, res);
})

module.exports = router;
