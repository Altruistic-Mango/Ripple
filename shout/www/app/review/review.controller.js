angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'ReviewFactory', 'CameraFactory'];

function ReviewCtrl($state, ReviewFactory, CameraFactory) {
  console.log('ReviewCtrl');

  CameraFactory.registerObserverCallback(displayPhoto);

  var vm = this;

  vm.photo = CameraFactory.filePath || "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/goldengate.jpeg";
  vm.title = "";
  vm.description = "";
  vm.charsLeft = 140;
  vm.getRemaining = getRemaining;
  vm.takePhoto = takePhoto;

  vm.savePhoto = savePhoto;
  vm.sharePhoto = sharePhoto;
        
  function getRemaining() {
    vm.charsLeft = 140-vm.description.length;
  }

  function takePhoto() {
    CameraFactory.takePicture(function () {
      console.log('tookPhoto');
    });
  }

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
