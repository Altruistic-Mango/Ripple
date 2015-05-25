angular
  .module('shout.location')
  .factory('LocationFactory', LocationFactory);

LocationFactory.$inject = ['$ionicPlatform', '$http'];

function LocationFactory($ionicPlatform, $http) {
  console.log('LocationFactory');
  var currentPosition;
  var services = {
    setPosition: setPosition,
    setWatch: setWatch,
    getCurrentPosition: getCurrentPosition,
    getSuccessCallback: getSuccessCallback,
    watchSuccessCallback: watchSuccessCallback,
    errorCallback: errorCallback,
    currentPosition: currentPosition,
    clearWatch: clearWatch
  };

  setInterval(sendPosition, 60000);

  return services;

  function getCurrentPosition (successCallback, errorCallback) {
    console.log('about to grab the initial position');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  function setWatch (successCallback, errorCallback) {
    console.log('setting watch on position');
    var watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
  }

  function setPosition (position) {

    currentPosition = {
                      username: 'mango',
                      x: position.coords.latitude,
                      y: position.coords.longitude
                      };
    console.log(' currentPosition set! ', currentPosition);

  }

  function sendPosition () {
    $http.post('http://localhost:3000/gps/position', currentPosition).success(function(){console.log('sent position to server');});
  }

  function errorCallback(error) {
    console.log('error getting position: ', error);
  }

  function getSuccessCallback (position) {
    setPosition(position);
    sendPosition();
  }

  function watchSuccessCallback (position) {
    setPosition(position);
  }

  function clearWatch () {
    navigator.geolocation.clearWatch(watchId);
  }

}
