angular
  .module('shout.tabs')
  .controller('TabsCtrl', TabsCtrl);

TabsCtrl.$inject = ['$state', '$localstorage', 'CameraFactory'];

function TabsCtrl($state, $localstorage, CameraFactory){
  var vm = this;

  vm.takePhoto = takePhoto;

  function takePhoto() {
    CameraFactory.takePicture(function(imageURI) {
      $localstorage.set('imagePath', imageURI);
      $state.go('review');
    });
  }
}
