angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory', 'InboxFactory', 'User', '$http', 'API_HOST', '$ionicModal'];

function AlbumCtrl($scope, $state, AlbumFactory, InboxFactory, User, $http, API_HOST, $ionicModal) {
  console.log('AlbumCtrl');

  var vm = this;

  vm.album = User.album();
  vm.url = User.url;
  vm.deleteFromAlbum = deleteFromAlbum;
  vm.add = InboxFactory.add;
  vm.remove = InboxFactory.remove;
  vm.openModal = openModal;
  vm.closeModal = closeModal;
  vm.getAlbum = getAlbum;
  vm.getItemHeight = getItemHeight;

  function getItemHeight() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return Math.floor(width/2);
  }

  AlbumFactory.createThumbData(vm.album);

  $scope.$on('updateAlbum', function(event) {
    console.log('onUpdateAlbum');
    vm.album = User.album();
    AlbumFactory.createThumbData(vm.album);
  });

  $scope.$on('updateInbox', function(event) {
    console.log('onUpdateInbox');
    vm.getAlbum();
  });

  function deleteFromAlbum(photo) {
    console.log('deleteFromAlbum');
    vm.remove(photo, vm.album);
    User.album('remove', photo);
    AlbumFactory.deleteFromAlbum(photo);
  }

  function getAlbum() {
    console.log('called getAlbum on album controller');
    AlbumFactory.getAlbum();
  }

  $ionicModal.fromTemplateUrl('app/modal/imgView.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });

  function openModal(photo) {
    vm.photoId = photo.photoId;
    vm.bigPhoto = vm.url(vm.photoId);
    vm.caption = photo.caption;
    $scope.modal.show();
  }

  function closeModal() {
    console.log('close modal');
    $scope.modal.hide();
  }
}

