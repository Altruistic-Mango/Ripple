var app = require('../../app');
var gpsController = require('../../Controllers/gpsController.js');
var userController = require('../../Controllers/userController.js');
var User = require('../../Models/User.js');
var mocha = require('mocha');
var dummyBroadcast = require('./dummyBroadcast.js');


var populateApp = function(num){
  var userArr = [];
//creates an array of dummy users 
  var createDummyUserArr = function(num){ 

    //creates fake userId 
    var userId = function() {
      var id = "";
      while (id.length < 7) {
        id +=  Math.floor(Math.random() * (10 - 1) + 1);
      }
      return id;
    };

    // generates random 10 digit username
    var randomName = function() {
      var name = "";
      var letters = "abcdefghijklmnopqrstuvwxyz";
      for(var i=0; name.length<11; i++){
        var slice = Math.floor(Math.random()*27)
        name += letters.slice(slice, slice+1);
      }
      return name;
    };
    
    //generates random Lat in SF
    var genRndLat = function(){
      var genLat = Math.random() * (122.525999 - 122.325999) - (122.525999);
      return genLat.toFixed(6);
    }
    //generates random Long in SF
    var genRndLong = function(){
      var genLong = Math.random() * (37.813501 - 37.613501) + 37.613501;
      return genLong.toFixed(6);
    }
    var injectConstantUser = function(){
      var constantUser = {body: {}};
        constantUser.body = {};
        constantUser.body.userId = 7654321;
        constantUser.body.x = genRndLong();
        constantUser.body.y = genRndLat();
        constantUser.body.username = 'Eden';
        constantUser.body.password = 'edenrules';
      userArr.push(constantUser);
    }();

    var createUser = function(){
      var dummyUser = {body: {}}
      dummyUser.body.userId = userId();
      dummyUser.body.x = genRndLat();
      dummyUser.body.y = genRndLong();
      dummyUser.body.username = randomName();
      dummyUser.body.password = randomName();
      // dummyUser.body.inbox = []; 
      userArr.push(dummyUser);
    };

    while(userArr.length < num){
      createUser();
    }
  };

  createDummyUserArr(num);

  
  // calls the insertCoords method from gps conroller for all dummy users
  var populateQuadTree = function() {
    for(var i=0; i<userArr.length; i++){
      gpsController.insertCoords(userArr[i]);
    }
  };
  populateQuadTree();

  var populateUserDB = function(){
    for(var i=0; i<userArr.length; i++){

      User.create(userArr[i].body, function(err, result){
        if(err){
          console.log("Dummy User Create Error: ", err);
          return;
        } else {
          console.log("Successfully created dummy users: ", result);
        }
      });
    }
    dummyBroadcast.fireStorePhoto();
  };
  populateUserDB();

  // User.remove({}, function(err, result){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(result);
  //   }
  // });

  //   User.find({}, function(err, res){
  //     if(err){
  //       console.log("this the error from pop: ", err);
  //     } else {
  //       console.log(res);
  //     }
  //   });
};


populateApp(50);


