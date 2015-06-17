angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', '$http', '$ionicModal', 'AlbumFactory', 'InboxFactory', 'CameraFactory', 'User', 'API_HOST'];

function AlbumCtrl($scope, $state, $http, $ionicModal, AlbumFactory, InboxFactory, CameraFactory, User, API_HOST) {
  console.log('AlbumCtrl');

  var vm = this;

  vm.album           = User.album(); 
  vm.getItemHeight   = getItemHeight;
  vm.deleteFromAlbum = deleteFromAlbum;
  vm.openModal       = openModal;
  vm.closeModal      = closeModal;
  vm.takePhoto       = CameraFactory.takePicture;

  $scope.$on('updateAlbum', function(event, album) {
    vm.album = album;
  });

  function getItemHeight() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return Math.floor(width/2);
  }

  function deleteFromAlbum(photo) {
    AlbumFactory.deleteFromAlbum(photo);
  }

  //MODAL
  $ionicModal.fromTemplateUrl('app/modal/imgView.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
    $scope.modal = modal;
  });

  function openModal(photo) {
    vm.photoId = photo.photoId;
    vm.bigPhoto = User.url(vm.photoId);
    vm.caption = photo.caption;
    $scope.modal.show();
  }

  function closeModal() {
    console.log('close modal');
    $scope.modal.hide();
  }

}

