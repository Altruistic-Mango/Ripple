angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'ReviewFactory', 'CameraFactory'];

function ReviewCtrl($state, ReviewFactory, CameraFactory) {
  console.log('ReviewCtrl');

  CameraFactory.registerObserverCallback(displayPhoto);

  var vm = this;

  vm.photo = CameraFactory.filePath;
  vm.sharePhoto = sharePhoto;

  function displayPhoto() {
    vm.photo = CameraFactory.filePath;
  }

  function sharePhoto(){
    $state.go('tab.settings');
  }
}
