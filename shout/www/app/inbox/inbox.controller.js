angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory'];

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory) {
  console.log('InboxCtrl');
  var vm = this;

  //when user clicks save on a photo call AlbumFactory.savePhoto();
  vm.photos = InboxFactory.photos;
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
}
