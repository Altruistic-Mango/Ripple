/* This controller adds and retrieves Photos from the database*/

var Photo = require('../Models/Photo.js');
var eventController = require('../Controllers/eventController.js');
var mongoose = require('mongoose');
var db = require('../db.js');
var Q = require('q');



var photoController = {

	storePhoto: function(req, res) {

		var data = {
			userId: req.body.userId,
			photoId: req.body.photoId,
			timestamp: req.body.timestamp || 5000,
		  radius: +req.body.radius,
		  TTL: +req.body.TTL,
		  photoURL: req.body.photoURL || "http://localhost/",
		};

		Photo.create(data, function(err, photo){
			if(err) {
				console.log("Error: ", err);
			}

			else if (photo) {
				eventController.broadcastEvent(req, res);
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