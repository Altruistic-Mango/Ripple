angular
  .module('shout.location')
  .factory('LocationFactory', LocationFactory);

LocationFactory.$inject = ['$ionicPlatform', '$http'];  

function LocationFactory($ionicPlatform, $http) {
  console.log('location factory instantiated');
  var currentPosition;

  var getCurrentPosition = function(successCallback, errorCallback) {
    console.log('about to grab the initial position');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  var setWatch = function(successCallback, errorCallback) {
    console.log('setting watch on position');
    var watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
  }

  var setPosition = function(position) {

    currentPosition = {
                      username: 'mango',
                      x: position.coords.latitude,
                      y: position.coords.longitude
                      };
    console.log(' currentPosition set! ', currentPosition);

  };

  
  var sendPosition = function() {
    $http.post('/gps/position', currentPosition).success(function(){console.log('sent position to server')});
  };

  function errorCallback(error) {
    console.log('error getting position: ', error);
  }

  var getSuccessCallback = function (position) {
    setPosition(position);
    sendPosition(); 
  };

  var watchSuccessCallback = function (position) {
    setPosition(position);
  }

  var clearWatch = function() {
    navigator.geolocation.clearWatch(watchId);
  };

  setInterval(sendPosition, 60000);

  return {
    setPosition: setPosition,
    getCurrentPosition: getCurrentPosition,
    setWatch: setWatch,
    getSuccessCallback: getSuccessCallback,
    watchSuccessCallback: watchSuccessCallback,
    currentPosition: currentPosition,
    errorCallback: errorCallback,
    clearWatch: clearWatch
  };
}
