var app = require('../app');
var gpsController = require('../Controllers/gpsController.js');
var mocha = require('mocha');

//creates an array of dummy users 
var createDummyUserArr = function(num){

  var userArr = [];

  var userId = function() {
    var id = "";
    while (id.length < 7) {
      id +=  Math.floor(Math.random() * (10 - 1) + 1);
    }
    return id;
  };

  // var randomName = function() {
  //   var name = "";
  //   var letters = "abcdefghijklmnopqrstuvwxyz";
  //   for(var i=0; name.length<11; i++){
  //     var slice = Math.floor(Math.random()*27)
  //     name += letters.slice(slice, slice+1);
  //   }
  //   return name;
  // };

  var genRndLat = function(){
    var genLat = JSON.stringify(Math.random()*(122.510728 - 122.387475) + 122.387475 * -1);
    return genLat.slice(0, 11);
  }

  var genRndLong = function(){
    var genLong = JSON.stringify(Math.random()*(37.808712 - 37.709369) + 37.709369);
    return genLong.slice(0, 9);
  }


  for(var i=0; i<num; i++){
    var createUser = function(){
      var dummyUser = {body: {}}
      dummyUser.body.userId = userId();
      dummyUser.body.x = genRndLong();
      dummyUser.body.y = genRndLat(); 
      userArr.push(dummyUser);
    }();
  }

  return userArr;

}


var sender = function(){
  var arr = createDummyUserArr();
  for(var i=0; i<arr.length; i++){
    gpsController.insertCoords(arr[i]);
  }
}();

