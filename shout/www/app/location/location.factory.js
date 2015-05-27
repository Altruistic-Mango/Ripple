angular
  .module('shout.location')
  .factory('LocationFactory', LocationFactory);

LocationFactory.$inject = ['$ionicPlatform', '$http', 'InboxFactory'];

function LocationFactory($ionicPlatform, $http, InboxFactory) {
  console.log('LocationFactory');
  var currentPosition, watchId, intervalId;
  var services = {
    setPosition: setPosition,
    setWatch: setWatch,
    getCurrentPosition: getCurrentPosition,
    getSuccessCallback: getSuccessCallback,
    watchSuccessCallback: watchSuccessCallback,
    errorCallback: errorCallback,
    currentPosition: currentPosition,
    clearWatch: clearWatch, 
    triggerPingInterval: triggerPingInterval,
    clearPingInterval: clearPingInterval, 
    intervalId: intervalId
  };

  triggerPingInterval()

  return services;

  function getCurrentPosition (successCallback, errorCallback) {
    console.log('about to grab the initial position');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  function setWatch (successCallback, errorCallback) {
    console.log('setting watch on position');
    watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
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
    // $http.post('http://localhost:3000/gps/position', currentPosition).success(InboxFactory.updateInbox(data));
    $http.post('http://localhost:3000/gps/position', currentPosition).success(function(){console.log('send position to server!!!')});

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

  function triggerPingInterval() {
    intervalId = setInterval(sendPosition, 60000);
  }

  function clearPingInterval() {
    console.log('clear ping interval called with id: ', intervalId);
    clearInterval(intervalId)
    intervalId = null; 
  }

}
