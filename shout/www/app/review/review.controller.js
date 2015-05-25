angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'CameraFactory'];

function ReviewCtrl($state, CameraFactory) {
  console.log('ReviewCtrl');
  var vm = this;

  vm.photo = CameraFactory.photo;
}
