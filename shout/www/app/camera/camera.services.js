angular
  .module('shout.camera')
  .factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$rootScope'];

function CameraFactory($rootScope) {
  console.log('CameraFactory');
  var services = {};

  var uploadurl = "http://localhost/upl";
  var pictureSource;
  var destinationType; // sets the format of returned value
  var picture;
  initialize();

  services.query = query;
  services.takePicture = takePicture;

  return services;

  function initialize() {
    ionic.Platform.ready(function() {
      if (!navigator.camera) {
        // error handling
        console.log('no camera found');
        return;
      }
      //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
      pictureSource = navigator.camera.PictureSourceType.CAMERA;
      destinationType = navigator.camera.DestinationType.FILE_URI;
    });
  }

  function query() {
    console.log('query');
    return uploadurl;
  }

  function takePicture() {
    console.log('takePicture');
    var options = {
      quality: 50,
      destinationType: destinationType,
      sourceType: pictureSource,
      encodingType: 0
    };
    if (!navigator.camera) {
      // error handling
      console.log('no camera found');
      return;
    }
    navigator.camera.getPicture(
      function(imageURI) {
        console.log("got camera success ", imageURI);
        mypicture = imageURI;
      },
      function(err) {
        // error handling camera plugin
        console.log("got camera error ", err);
      },
      options);
  }
}
