angular
  .module('shout.camera')
  .factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$state'];

function CameraFactory($state) {
  console.log('CameraFactory');
  var services = {};

  var uploadurl = "http://localhost/upl";
  var pictureSource;
  var destinationType; // sets the format of returned value
  var picture;
  initialize();

  services.query = query;
  services.takePicture = takePicture;
  services.getPicture = getPicture;

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
      $state.go('review');
      return;
    }
    navigator.camera.getPicture(
      function(imageURI) {
        console.log('got camera success');
        picture = imageURI;
        $state.go('review');
      },
      function(err) {
        // error handling camera plugin
        console.log('got camera error ', err);
        $state.go('review');
      },
      options);
  }

  function getPicture() {
    return picture;
  }
}
