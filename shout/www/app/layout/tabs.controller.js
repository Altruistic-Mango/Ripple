angular
  .module('shout.tabs')
  .controller('TabsCtrl', TabsCtrl);

TabsCtrl.$inject = ['$state', '$localstorage', 'CameraFactory', 'ionicMaterialInk'];

function TabsCtrl($state, $localstorage, CameraFactory, ionicMaterialInk){
  var vm = this;

  vm.takePhoto = takePhoto;

  function takePhoto() {
    ionicMaterialInk.displayEffect();
    CameraFactory.takePicture(function(imageURI) {
      $localstorage.set('imagePath', imageURI);
      $state.go('review');
    });
  }
}
