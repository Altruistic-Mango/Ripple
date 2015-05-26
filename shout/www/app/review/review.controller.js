angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'CameraFactory', 'ReviewFactory'];

function ReviewCtrl($state, CameraFactory, ReviewFactory) {
  console.log('ReviewCtrl');
  var vm = this;

  vm.photo = CameraFactory.getPicture();
  vm.sharePhoto = ReviewFactory.sharePhoto;
}
