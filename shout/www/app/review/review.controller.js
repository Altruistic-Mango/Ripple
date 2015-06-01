angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'ReviewFactory', 'CameraFactory'];

function ReviewCtrl($state, ReviewFactory, CameraFactory) {
  console.log('ReviewCtrl');
  var vm = this;

  vm.photo = CameraFactory.filePath;
  vm.sharePhoto = sharePhoto;

  displayPhoto();

  function displayPhoto() {
    vm.photo = CameraFactory.filePath;
  }
  
  function sharePhoto(){
    $state.go('tab.settings');
  }
}
