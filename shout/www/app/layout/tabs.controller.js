angular
  .module('shout.tabs')
  .controller('TabsCtrl', TabsCtrl);

TabsCtrl.$inject = ['$state', '$localstorage', 'CameraFactory'];

function TabsCtrl($state, $localstorage, CameraFactory){
  vm = this;
  vm.takePicture = takePicture;
  
  function takePicture() {
    CameraFactory.takePicture(function(imageURI) {
      $localstorage.set('imagePath', imageURI);
      $state.go('review'); 
    });
  }
}
