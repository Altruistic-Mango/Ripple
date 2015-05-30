angular
  .module('shout.broadcast')
  .factory('BroadcastFactory', BroadcastFactory);

BroadcastFactory.$inject = ['LocationFactory', '$http', 'API_HOST'];

function BroadcastFactory(LocationFactory, $http, API_HOST) {
  var services = {};
    services.reBroadcast = reBroadcast;
    services.sendBroadcastEvent = sendBroadcastEvent;
  return services;

  function reBroadcast(photo) {
    console.log('currentPosition: ', LocationFactory.currentPosition);
    if (LocationFactory.currentPosition && LocationFactory.currentPosition.userId &&
        LocationFactory.currentPosition.x && LocationFactory.currentPosition.y) {
      photo = _.extend(photo, LocationFactory.currentPosition);
      photo.timestamp = new Date().getTime();
      console.log('reBroadcast this photo: ', photo);
      services.sendBroadcastEvent(photo);
    } else {
      console.log('sorry cant broadcast that photo');
    }
  }

  function sendBroadcastEvent (broadcastEvent) {
    $http.post(API_HOST + '/events/broadcast', broadcastEvent).success(function(){console.log('sent broadcast event to server!!!');});
  }
}
