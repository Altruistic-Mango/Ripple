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
  vm.caption = "";
  vm.goInbox = goInbox;
  vm.takePhoto = takePhoto;
  vm.savePhoto = savePhoto;
  vm.sharePhoto = sharePhoto;

  function goInbox() {
    $state.go('tab.inbox');
  }

  function takePhoto() {
    CameraFactory.takePicture(function() {
      console.log('tookPhoto');
    });
  }

  function displayPhoto() {
    console.log('displayPhoto');
    vm.caption = ""; //clear caption if new photo
    vm.photo = CameraFactory.filePath;
  }

  //TODO: save to album
  function savePhoto() {

  }

  function sharePhoto() {
    User.caption(vm.caption);
    $state.go('broadcast');
  }

  function resizeFile(filePath, callback) {
    var tempImg = new Image();
    //tempImg.src = filePath;
    tempImg.src = "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/87741251434214608748.jpeg";
    tempImg.onload = function() {

      var MAX_WIDTH = 200;
      var MAX_HEIGHT = 200;

      srcSize = 0;
      destSize = 0;
      var dx = 0;
      var dy = 0;

      if (this.height >= this.width) {
        srcSize = this.width;
        destSize = srcSize;
        while(destSize/2 >= 200) {
          destSize = destSize/2;
        }
        dy = Math.floor((this.height-this.width)/2);
      } else {
        dx = Math.floor((this.height-this.width)/2);
        srcSize = this.height;
        destSize = srcSize;
        while(destSize/2 >= 200) {
          destSize = destSize/2;
        }
      }
        
      var canvas = document.createElement('canvas');
      canvas.width = destSize;
      canvas.height = destSize;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, dx, dy, srcSize, srcSize, 0, 0, destSize, destSize);
      var dataURL = canvas.toDataURL("image/jpeg");
      var imageData = ""+dataURL;
      callback(imageData);
    };
  }
}
