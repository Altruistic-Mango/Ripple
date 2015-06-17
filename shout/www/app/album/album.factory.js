angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

AlbumFactory.$inject = ['$rootScope', '$http', 'CameraFactory', 'User', 'API_HOST'];

function AlbumFactory($rootScope, $http, CameraFactory, User, API_HOST) {
  console.log('AlbumFactory');

  var album = User.album();
  getAlbum();

  var services = {};

  services.saveToAlbum     = saveToAlbum;
  services.deleteFromAlbum = deleteFromAlbum;
  services.getAlbum        = getAlbum;

  return services;

  function saveToAlbum(photo) {
    console.log('saveToAlbum');
    photo.url =  photo.url || User.url(photo.photoId);
    photo.thumb = photo.thumb || CameraFactory.createThumbData(photo);
    if (User.album('add', photo)) {
      updateAlbum();
      uploadToAlbum(photo);
    }
  }

  function getAlbum() {
    console.log('AlbumFactory getAlbum');
    $http.get(API_HOST + '/users/album/' + User.userId())
      .success(function(data) {
        data.forEach(function(photo) {
          photo.url = User.url(photo.photoId);
          photo.thumb = photo.thumb || CameraFactory.createThumbData(photo);
        });
        if (User.album('add', data)) {
          album = data;
          updateAlbum();
        }
      })
      .error(function() {
        console.log('error getting inbox');
      });
  }

  function deleteFromAlbum(photo) {
    console.log('deleteFromAlbum');
    User.album('remove', photo);
    updateAlbum();

    var data = {
      userId: User.userId(),
      photoId: photo.photoId
    };

    $http.post(API_HOST + '/photos/deleteFromAlbum/', data)
      .success(function(data) {
        console.log('success deleteing photo from album');
        User.album('remove', photo); })
      .error(function() {
        console.log('Error deleting photo from album');
      });
  }

  function uploadToAlbum(photo) {
    console.log('uploadToAlbum');

    var data = {
      userId: User.userId(),
      photoId: photo.photoId
    };
    $http.post(API_HOST + '/users/album', data)
      .success(function(data) {
      })
      .error(function(error, data) {
        console.log('Error uploading to album',error);
      });
  }

  function updateAlbum() {
    $rootScope.$broadcast('updateAlbum', album);
  }
}

