angular
  .module('shout.tabs')
  .controller('TabsCtrl', TabsCtrl);

TabsCtrl.$inject = ['$state', '$localstorage', 'CameraFactory', 'ionicMaterialInk'];

function TabsCtrl($state, $localstorage, CameraFactory, ionicMaterialInk){
  var vm = this;
  ionicMaterialInk.displayEffect({'duration':2000});

  vm.takePhoto = takePhoto;


  function takePhoto() {
    CameraFactory.takePicture(function(imageURI) {
      $localstorage.set('imagePath', imageURI);
      $state.go('review');
    });
  }
}
