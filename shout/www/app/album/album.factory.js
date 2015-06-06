angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

AlbumFactory.$inject = ['$rootScope', '$http', '$localstorage', 'API_HOST'];

function AlbumFactory($rootScope, $http, $localstorage, API_HOST) {
  console.log('AlbumFactory');
  var services = {};

  services.photos = [];
  services.savePhoto = savePhoto;
  services.getAlbum = getAlbum;
  services.checkCollision = checkCollision;
  services.updateAlbum = updateAlbum;


  return services;

  function updateAlbum(photos) {
    console.log('updateAlbum called');
    services.photos = services.photos.concat(photos);
    console.log('services.photos after concat: ', services.photos);
    $rootScope.$broadcast('updateAlbum', photos);
  }

  function savePhoto(photo) {
    var user = $localstorage.getObject('user');

    if (!checkCollision(photo)) {
      var photoIdObj = {
        userId: user.userId,
        photoId: photo.photoId
      };
      console.log('asking server to add photo to album: ', photoIdObj);
      $http.post(API_HOST + '/users/album', photoIdObj)
        .success(function(data) {
          services.updateAlbum([{
            photoId: photo.photoId
          }]);
        });
    }
  }

  function getAlbum() {
    var user = $localstorage.getObject('user');
    var userId = user.userId; 
    $http.get(API_HOST + '/users/album/' + userId)
      .success(function(data) {
        console.log('success getting album!!');
        services.updateAlbum(services.photos);
      });
  }

  function checkCollision(photo) {
    var idArray = [];
    services.photos.forEach(function(item) {
      idArray.push(item.photoId);
    });
    return _.contains(idArray, photo.photoId);
  }


}
