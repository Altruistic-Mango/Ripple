angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

AlbumFactory.$inject = ['$rootScope', '$http', 'User', 'API_HOST'];

function AlbumFactory($rootScope, $http, User, API_HOST) {
  console.log('AlbumFactory');

  var services = {};

  services.saveToAlbum = saveToAlbum;
  services.deleteFromAlbum = deleteFromAlbum;

  return services;


  function saveToAlbum(photo) {
    console.log('saveToAlbum');
    var saved = User.album('add', photo);
    $rootScope.$broadcast('updateAlbum');
    if (saved) {
      uploadToAlbum(photo);
    }
  }

  function deleteFromAlbum(photo) {
    console.log('deleteFromAlbum');

    var data = {
      userId: User.userId(),
      photoId: photo.photoId
    };

    $http.post(API_HOST + '/photos/deleteFromAlbum/', data)
      .success(function(data) {
        console.log('success deleteing photo from album');
      })
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

  function getAlbum() {
    console.log('AlbumFactory getAlbum');
    $http.get(API_HOST + '/users/album/' + User.userId())
      .success(function(data) {
        console.log(JSON.stringify(data));
        data.forEach(function(photo) {
          saveToAlbum(photo);
        })
      })
      .error(function() {
        console.log('error getting inbox'); 
      });
  }
}

