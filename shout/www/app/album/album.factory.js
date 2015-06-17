angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

AlbumFactory.$inject = ['$rootScope', '$http', 'CameraFactory', 'User', 'API_HOST'];

function AlbumFactory($rootScope, $http, CameraFactory, User, API_HOST) {
  console.log('AlbumFactory');

  var services = {};

  services.saveToAlbum = saveToAlbum;
  services.deleteFromAlbum = deleteFromAlbum;
  services.getAlbum = getAlbum;
  services.createThumbData = createThumbData;

  return services;

  function saveToAlbum(photo) {
    console.log('saveToAlbum');
    photo.url = User.url(photo.photoId);
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
          console.log(JSON.stringify(photo));
          photo.url = User.url(photo.photoId);
        });
        saveToAlbum(photo);
        $rootScope.$broadcast('updateAlbum');
      })
      .error(function() {
        console.log('error getting inbox');
      });
  }

  function createThumbData(collection) {
    collection.forEach(function(photo) {
      if (!photo.thumb) {
        resizeFile(photo.url, function(imageData) {
          photo.thumb = imageData;
        });
      }
    });
  }

  function resizeFile(filePath, callback) {
    var tempImg = new Image();
    tempImg.crossOrigin="anonymous";
    tempImg.src = filePath;
    tempImg.onload = function() {

      var MAX_WIDTH = 200;
      var MAX_HEIGHT = 200;

      srcSize = 0;
      destSize = 0;
      var dx = 0;
      var dy = 0;

      if (this.height >= this.width) {
        srcSize = this.width;
        destSize = srcSize;
        while(destSize/2 >= 200) {
          destSize = destSize/2;
        }
        dy = Math.floor((this.height-this.width)/2);
      } else {
        srcSize = this.height;
        destSize = srcSize;
        while(destSize/2 >= 200) {
          destSize = destSize/2;
        }
        dx = Math.floor((this.width-this.height)/2);
      }

      var canvas = document.createElement('canvas');
      canvas.width = destSize;
      canvas.height = destSize;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, dx, dy, srcSize, srcSize, 0, 0, destSize, destSize);
      var dataURL = canvas.toDataURL("image/jpeg");
      var imageData = ""+dataURL;
      callback(imageData);
    };
  }
}

