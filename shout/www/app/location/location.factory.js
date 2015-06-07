angular
  .module('shout.location')
  .factory('LocationFactory', LocationFactory);

LocationFactory.$inject = ['$http', 'InboxFactory', 'API_HOST', 'User'];

function LocationFactory($http, InboxFactory, API_HOST, User) {
  console.log('LocationFactory');

  var currentPosition, intervalId;

  var services = {};

  services.triggerPingInterval  = triggerPingInterval;
  services.clearPingInterval    = clearPingInterval;
  services.getUsersPosition     = getUsersPosition;

  return services;


  function triggerPingInterval() {
    if (!intervalId) {
      sendPosition();
      intervalId = setInterval(sendPosition, 60000);
    }
  }


  function clearPingInterval() {
    console.log('clearPingInterval');
    clearInterval(intervalId);
  }


  function getUsersPosition(){
    return currentPosition;
  }


  function sendPosition() {
    console.log('sendPosition');
    getCurrentPosition(function(position) {

      setPosition(position);

      if (currentPosition.x && currentPosition.y) {
        $http.post(API_HOST + '/gps/position', currentPosition)
          .success(function(data) {
            InboxFactory.updateInbox(data);
        });
      } else {
        console.log('Error: Incomplete Position Data');
      }
    });
  }


  function getCurrentPosition(successCallback, errorCallback) {
    console.log('getCurrentPosition');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }


  function setPosition(position) {
    currentPosition = {
      userId: User.userId(),
      y: position.coords.latitude,
      x: position.coords.longitude,
      timestamp: new Date().getTime()
    };
    console.log('currentPosition', currentPosition);
  }


  function errorCallback(error) {
    console.log('error getting position: ', error);
  }

}
