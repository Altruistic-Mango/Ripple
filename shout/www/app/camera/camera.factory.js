angular
  .module('shout.camera')
  .factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$state'];

function CameraFactory($state) {
  console.log('CameraFactory');

  var pictureSource;
  var destinationType;
  var options;
  var observerCallbacks = [];

  var services = {};
  services.takePicture = takePicture;
  services.getFile = getFile;
  services.filePath = '';
  services.registerObserverCallback = registerObserverCallback;

  return services;


  function takePicture(callback) {
    console.log('CameraFactory.takePicture');
    initialize(function() {
      getPicture(callback);
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
          quality: 5,
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
    navigator.camera.getPicture(success, failure, options);

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
    window.resolveLocalFileSystemURL(services.filePath, success, failure);

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


  function registerObserverCallback(callback) {
    observerCallbacks.push(callback);
  }

  function notifyObservers() {
     observerCallbacks.forEach(function(callback) {
       callback();
     });
  }
}
