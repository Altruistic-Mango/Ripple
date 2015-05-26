/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var mongoose = require('mongoose');
var db = require('../db.js');



var photoController = {

	storePhoto: function(req, res) {

		newPhoto = new Photo({
		  photoId: req.body.photoId,
		  radius: req.body.radius,
		  TTL: req.body.TTL,
		  photoURL: req.body.photoURL,
		  recipientList: req.body.recipientList
	  });

		newPhoto.save(function(err, newPhoto){
			console.log("in photo save function");
			if(err){
				console.log("Photo Error: ", err);
				res.send(500);
				res.end();
			} else {
				res.send(200, newPhoto);
				res.end();
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
	},

	testingFunc: function(req, res) {
		res.status(200);
		res.end();
	}
};

module.exports = photoController;