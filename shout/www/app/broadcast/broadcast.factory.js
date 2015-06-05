angular
  .module('shout.broadcast')
  .factory('BroadCastFactory', BroadCastFactory);

BroadCastFactory.$inject = ['$localstorage', 'LocationFactory', '$http', 'API_HOST'];

function BroadCastFactory($localstorage, LocationFactory, $http, API_HOST) {

  var services = {};

  services.newPhoto = newPhoto;
  services.reBroadCast = reBroadCast;
  services.sendBroadCastEvent = sendBroadCastEvent;

  return services;

  function newPhoto(TTL, radius) {
    console.log('newPhoto');
    var pos = LocationFactory.getUsersPosition();
    var data = $localstorage.getObject('photo');
    data.x = pos.x;
    data.y = pos.y;
    console.log('data',data);
    $http.post(API_HOST + '/photos/newPhoto', data)
      .success(function() {
        console.log('photo data sent to server');
      });
  }

  function reBroadCast(photo) {
    var LF = LocationFactory;
    console.log('currentPosition: ', LF.currentPosition);
    if (LF.currentPosition && LF.currentPosition.userId && LF.currentPosition.x && LF.currentPosition.y) {
      photo = _.extend(photo, LF.currentPosition);
      photo.timestamp = new Date().getTime();
      console.log('reBroadCast this photo: ', photo);
      services.sendBroadCastEvent(photo);
    } else {
      console.log('sorry cant broadcast that photo');
    }
  }

  function sendBroadCastEvent (broadcastEvent) {
    $http.post(API_HOST + '/events/broadcast', broadcastEvent).success(function(){console.log('sent broadcast event to server!!!');});
  }
}
