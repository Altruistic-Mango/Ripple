var app = require('../../app.js');
var User = require('../../Models/User.js');
var photoController = require('../../Controllers/photoController.js');
var Photo = require('../../Models/Photo.js');
var mocha = require('mocha');
var quadtree = require('../../Utils/Qtree.js');
var Promise = require('bluebird');

var dummyBroadcast = {

  photoFind: function(){
    Photo.find({}, function(err, re2s){
      if(err){
        console.log('This is the error');
        console.log(err);
      } else {
        console.log('this is the find in dummy bcast');
        console.log(res);
      }
    });
  },

  fireStorePhoto: function(){
    var dummyPhoto = { body:{} }
    dummyPhoto.body.photoId = "43772621432956654430",
    dummyPhoto.body.userId = 7654321,
    dummyPhoto.body.radius = 5,
    dummyPhoto.body.TTL = 10,
    dummyPhoto.body.x = Math.random() * (122.525999 - 122.325999) - (122.525999);
    dummyPhoto.body.y = Math.random() * (37.813501 - 37.613501) + 37.613501;
    dummyPhoto.body.timestamp = new Date().getTime();

    photoController.storePhoto(dummyPhoto, {
      end: function() { return; },
      send: function() { return; }
    });
  },

  constantUser: function(){
    User.find({}, function(err, results){
      if(err){
        console.log(err);
      } else {
        console.log(results[0]['userId']);
        fireStorePhoto();
        return results[0][userId]; 
      }
    });
  }

}


module.exports = dummyBroadcast;
