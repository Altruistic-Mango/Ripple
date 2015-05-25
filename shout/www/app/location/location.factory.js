angular
  .module('shout.location')
  .factory('LocationFactory', LocationFactory);

function LocationFactory($ionicPlatform) {
  console.log('location factory instantiated');
  var currentPosition;
  $ionicPlatform.ready(function() {
    console.log('about to grab the geolocation');
    navigator.geolocation.getCurrentPosition(setPosition, errorCallback);
    navigator.geolocation.watchPosition(setPosition, errorCallback);
  });

  function setPosition(position) {
    console.log('setPosition called with: ', position);
    currentPosition = position.coords;
    console.log('currentPosition set! ', currentPosition);
  }

  function errorCallback(error) {
    console.log('error getting position: ', error);
  }

  return {
    setPosition: setPosition,
    currentPosition: currentPosition
  };
}
