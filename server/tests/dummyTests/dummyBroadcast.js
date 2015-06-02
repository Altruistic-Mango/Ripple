var app = require('../../app.js');
var User = require('../../Models/User.js');
var photoController = require('../../Controllers/photoController.js');
var Photo = require('../../Models/Photo.js');
var mocha = require('mocha');
var quadtree = require('../../Utils/Qtree.js');
var Promise = require('bluebird');

var photoFind = function(){
  Photo.find({}, function(err, res){
    if(err){
      console.log('This is the error');
      console.log(err);
    } else {
      console.log('this is the find in dummy bcast');
      console.log(res);
    }
  });
}

var fireStorePhoto = function(){
  var dummyPhoto = { body:{} }
  dummyPhoto.body.photoId = "43772621432956654430",
  dummyPhoto.body.userId = 7654321,
  dummyPhoto.body.radius = 7,
  dummyPhoto.body.TTL = 10,
  dummyPhoto.body.timestamp = new Date().getTime();

  photoController.storePhoto(dummyPhoto, function(){
    quadtree.traverse();
  });
};

var constantUser = function(){
  User.find({}, function(err, results){
    if(err){
      console.log(err);
    } else {
      console.log(results[0]['userId']);
      return results[0][userId]; 
    }
  });
  fireStorePhoto();
}();



