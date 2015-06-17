angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$interval', 'InboxFactory', 'AlbumFactory', 'CameraFactory', 'User', 'LoginFactory', 'BroadCastFactory', 'ionicMaterialInk', 'API_HOST', '$ionicModal'];

function InboxCtrl($scope, $interval, InboxFactory, AlbumFactory, CameraFactory, User, LoginFactory, BroadCastFactory, ionicMaterialInk, API_HOST, $ionicModal) {
  console.log('InboxCtrl');

  var vm = this;

  vm.inbox           = [];
  vm.isDisabled      = {};
  vm.getItemHeight   = getItemHeight;
  vm.deleteFromInbox = deleteFromInbox;
  vm.saveToAlbum     = saveToAlbum;
  vm.reBroadCast     = reBroadCast;
  vm.refresh         = refresh;
  vm.openModal       = openModal;
  vm.closeModal      = closeModal;
  vm.takePhoto       = CameraFactory.takePicture;
  
  LoginFactory.checkLogin();

  vm.refresh();

  $scope.$on('updateInbox', function(event, inbox) {
    vm.inbox = inbox;
    CameraFactory.createThumbData(vm.inbox);
    $scope.$broadcast('scroll.refreshComplete');
  });

  function getItemHeight() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return Math.floor(width/2);
  }

  function deleteFromInbox(photo) {
    InboxFactory.deleteFromInbox(photo);
  }

  function saveToAlbum(photo) {
    AlbumFactory.saveToAlbum(photo);
  }

  function reBroadCast(photo) {
    //var rebroadcastPhoto = _.clone(photo);
    BroadCastFactory.reBroadCast(photo, function() {
      vm.isDisabled[photo.photoId] = true;
    });
  }

  function refresh() {
    InboxFactory.requestInbox();
  }


  //Modal
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
