angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'ReviewFactory', 'CameraFactory', 'User'];

function ReviewCtrl($state, ReviewFactory, CameraFactory, User) {
  console.log('ReviewCtrl');

  CameraFactory.registerObserverCallback(displayPhoto);

  var vm = this;

  vm.photo = CameraFactory.filePath || "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/goldengate.jpeg";
  vm.title = "";
  vm.caption= "";
  vm.goInbox = goInbox;
  vm.takePhoto = takePhoto;
  vm.savePhoto = savePhoto;
  vm.sharePhoto = sharePhoto;

  function goInbox() {
    $state.go('tab.inbox');
  }
        
  function takePhoto() {
    CameraFactory.takePicture(function () {
      console.log('tookPhoto');
    });
  }

  function displayPhoto() {
    vm.caption = "";//clear caption if new photo
    vm.photo = CameraFactory.filePath;
  }

  //TODO: save to album
  function savePhoto() {

  }

  function sharePhoto(){
    User.caption(vm.caption);
    $state.go('broadcast');
  }
}
