angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'ReviewFactory', 'CameraFactory'];

function ReviewCtrl($state, ReviewFactory, CameraFactory) {
  console.log('ReviewCtrl');

  CameraFactory.registerObserverCallback(displayPhoto);

  var vm = this;

  vm.photo = CameraFactory.filePath;
  vm.savePhoto = savePhoto;
  vm.sharePhoto = sharePhoto;
  vm.description = "Enter up 10 140 characters here";
  vm.title = "";
        
  function displayPhoto() {
    vm.photo = CameraFactory.filePath;
  }

  //TODO: save to album
  function savePhoto() {

  }

  function sharePhoto(){
    $state.go('broadcast');
  }
}
