angular
  .module('shout.broadcast')
  .factory('BroadCastFactory', BroadCastFactory);

BroadCastFactory.$inject = ['$rootScope', '$state', '$http', 'LocationFactory', 'CameraFactory', 's3', 'User', 'API_HOST'];

function BroadCastFactory($rootScope, $state, $http, LocationFactory, CameraFactory, s3, User, API_HOST) {

  var services = {};

  services.newPhoto = newPhoto;
  services.reBroadCast = reBroadCast;

  return services;

  function newPhoto(settings, cb) {
    console.log('newPhoto');

    var pos = LocationFactory.getUsersPosition();
    var timestamp = Date.now();

    var photo = {
      timestamp: timestamp,
      userId: User.userId(),
      photoId: User.userId() + timestamp,
      caption: User.caption(),
      TTL: settings.TTL,
      radius: settings.radius,
      trickle: settings.trickle,
      x: pos.x,
      y: pos.y
    };

    CameraFactory.getFile(function(file) {
      file.name = photo.photoId;
      s3.upload(file, function() {
        photo.url = User.url(photo.photoId);
        $http.post(API_HOST + '/photos/newPhoto', photo)
          .success(function() {
            cb(photo);
          });
      });
    });
  }

  function reBroadCast(photo, cb) {
    var pos = LocationFactory.getUsersPosition();
    console.log('currentPosition: ', pos);
    if (pos.userId && pos.x && pos.y) {
      photo = _.extend(photo, pos);
      photo.timestamp = Date.now();
      $http.post(API_HOST + '/events/broadcast', broadcastEvent)
        .success(function() {
          cb();
        });
    } else {
      console.log('sorry cant broadcast that photo');
    }
  }
}

