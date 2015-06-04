angular
  .module('shout.camera')
  .controller('CameraCtrl', CameraCtrl);

CameraCtrl.$inject = ['$rootScope', '$state', 'CameraFactory', '$localstorage'];

function CameraCtrl($rootScope, $state, CameraFactory, $localstorage) {
  console.log('CameraCtrl');
  var vm = this;

  takePhoto();

  function takePhoto() {
    CameraFactory.takePicture(function(imageURI) {
      $localstorage.set('imagePath', imageURI);
      $state.go('review');
    });
  }

}
