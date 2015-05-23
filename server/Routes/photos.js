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

module.exports = router;