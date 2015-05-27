var express = require('express');
var router = express.Router();
var photoController = require('../Controllers/photoController.js');
var s3 = require('../Utils/s3.js');

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

router.post('/signPolicyDoc', function(req, res) {
	console.log('Getting S3 policy doc signed by server');
	s3.docSign(req, res);
})

module.exports = router;