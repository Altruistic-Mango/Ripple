var app = require('../../app.js');
var User = require('../../Models/User.js');
var photoController = require('../../Controllers/photoController.js');
var Photo = require('../../Models/Photo.js');
var mocha = require('mocha');


var constantUser = function(){
  User.find({}, function(err, results){
    if(err){
      console.log(err);
    } else {
      console.log(results[0]['userId']);
      return results[0][userId]; 
    }
  });
}();

var fireStorePhoto = function(){
  var dummyPhoto = { body:{} }
  dummyPhoto.body.photoId = 43772621432956654430,
  dummyPhoto.body.radius = 2,
  dummyPhoto.body.TTL = 10

  photoController.storePhoto(dummyPhoto);
}();

Photo.find({}, function(err, res){
  if(err){
    console.log(err);
  } else {
    console.log(res);
  }
});



//query the database for a photo
//query database for random user 
//query the Quad tree for the users location.
//user that 