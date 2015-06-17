angular
  .module('shout.camera')
  .factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$state', 'User'];

function CameraFactory($state, User) {
  console.log('CameraFactory');

  var pictureSource;
  var destinationType;
  var options;
  var observerCallbacks = [];

  var services = {};

  services.takePicture = takePicture;
  services.getFile = getFile;
  services.filePath = '';
  services.createThumbData = createThumbData;
  services.registerObserverCallback = registerObserverCallback;

  return services;

  function takePicture() {
    console.log('CameraFactory.takePicture');
    initialize(function() {
      getPicture(function(imageURI) {
        services.filePath =  imageURI;
        $state.go('review');
      });
    });
  }

  function initialize(callback) {
    console.log('CameraFactory.initialize');
    ionic.Platform.ready(function() {
      if (!navigator.camera) {
        // error handling
        console.log('no camera found');
        $state.go('review');
      } else {
        console.log('inside the itinitialize camera funciton');
        //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
        pictureSource = navigator.camera.PictureSourceType.CAMERA;
        destinationType = navigator.camera.DestinationType.FILE_URI;
        options = {
          quality: 50,
          destinationType: destinationType,
          sourceType: pictureSource,
          encodingType: Camera.EncodingType.JPEG,
          correctOrientation: true,
          targetWidth: 720
        };
      }
      callback();
    });
  }

  function getPicture(callback) {
    console.log('CameraFactory.getPicture');
    try {
      navigator.camera.getPicture(success, failure, options);
    } catch (e) {
      console.log('no camera available');
    }

    function success(imageURI) {
      console.log('getPicture success with:' + imageURI);
      services.filePath = imageURI;
      notifyObservers();
      callback(imageURI);
    }

    function failure(message) {
      console.log('getPicture failed because: ' + message);
    }
  }

  function getFile(callback) {
    console.log('CameraFactory.getFile');
    try {
      window.resolveLocalFileSystemURL(services.filePath, success, failure);
    } catch (e) {
      console.log('no picture URL available');
    }

      

    function success(fileEntry) {
      console.log('getFile success');

      fileEntry.file(function(file) {
        services.photo = file;
        console.log('File Object', file);
        callback(file);
      });
    }

    function failure(message) {
      console.log('getFile failed because: ' + message);
    }
  }

  function createThumbData(collection) {
    if(! (collection instanceof Array) )
      collection = [collection];

    collection.forEach(function(photo) {
      if (!photo.thumb) {
        photo.url = photo.url || User.url(photo.photoId);
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


  function registerObserverCallback(callback) {
    observerCallbacks.push(callback);
  }

  function notifyObservers() {
     observerCallbacks.forEach(function(callback) {
       callback();
     });
  }
}
