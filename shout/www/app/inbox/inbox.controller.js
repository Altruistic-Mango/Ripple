angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory'];

function InboxCtrl($state, InboxFactory, AlbumFactory, CameraFactory) {
  console.log('InboxCtrl');
  var vm = this;

  //when user clicks save on a photo call AlbumFactory.savePhoto();
  vm.photos = InboxFactory.photos;
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
}
