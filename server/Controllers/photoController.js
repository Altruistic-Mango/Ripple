/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var db = require('../db.js');



var photoController = {

	storePhoto: function(req, res) {

		console.log(req.body);

		photoId = req.body.photoId;
	  radius = req.body.radius;
	  TTL = req.body.TTL;
	  photoURL = "www.somePhotoFromS3";
	  recipientList = ["a bunch of fricken people"];

		Photo.create({
			photoId: photoId,
		  radius: radius,
		  TTL: TTL,
		  photoURL: photoURL,
		  recipientList: recipientList
		}, function(err, photo){
			if(err){
				console.log("Error: ", err);
			}
		});
	},

	getPhotos: function(req, res) {
		Photo.find({}, function(err, data) {
			if (!err) {
				res.send(200, data);
			} else {
				throw err;
			}
		});
	}
}

module.exports = photoController;