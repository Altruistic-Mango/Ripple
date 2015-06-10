angular
  .module('shout.broadcast')
  .factory('BroadCastFactory', BroadCastFactory);

BroadCastFactory.$inject = ['$state', '$http', 'LocationFactory', 'CameraFactory', 's3', 'User', 'API_HOST'];

function BroadCastFactory($state, $http, LocationFactory, CameraFactory, s3, User, API_HOST) {

  var services = {};

  services.newPhoto = newPhoto;
  services.reBroadCast = reBroadCast;
  services.sendBroadCastEvent = sendBroadCastEvent;

  return services;

  function newPhoto(settings, cb) {
    console.log('newPhoto');

    var pos = LocationFactory.getUsersPosition();
    var timestamp = Date.now();

    var photo = {
      timestamp: timestamp,
      userId: User.userId(),
      photoId: User.userId() + timestamp, 
      TTL: settings.TTL,
      radius: settings.radius,
      trickle: settings.trickle,
      x: pos.x,
      y: pos.y
    };

    CameraFactory.getFile(function(file) {
      file.name = photo.photoId;
      console.log(file);
      s3.upload(file, function() {
        console.log('s3 upload success');
        console.log('photo',photo);

        $http.post(API_HOST + '/photos/newPhoto', photo)
          .success(function() {
            console.log('photo data sent to server');
            cb(); 
          });
      });
    });

  }

  function reBroadCast(photo) {
    var pos = LocationFactory.getUsersPosition();
    console.log('currentPosition: ', pos);
    if (pos.userId && pos.x && pos.y) {
      photo = _.extend(photo, pos);
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
