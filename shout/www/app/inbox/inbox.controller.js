angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$interval', 'InboxFactory', 'AlbumFactory', 'CameraFactory', 'User', 'LoginFactory', 'BroadCastFactory', 'ionicMaterialInk', 'API_HOST', '$ionicModal'];

function InboxCtrl($scope, $interval, InboxFactory, AlbumFactory, CameraFactory, User, LoginFactory, BroadCastFactory, ionicMaterialInk, API_HOST, $ionicModal) {
  console.log('InboxCtrl');

  var vm = this;

  vm.inbox           = [];
  vm.url             = User.url;
  vm.deleteFromInbox = deleteFromInbox;
  vm.saveToAlbum     = saveToAlbum;
  vm.reBroadCast     = reBroadCast;
  vm.refresh         = refresh;
  vm.add             = InboxFactory.add;
  vm.remove          = InboxFactory.remove;
  vm.isDisabled      = {};
  vm.openModal       = openModal;
  vm.closeModal      = closeModal;
  vm.takePhoto       = CameraFactory.takePicture;
  vm.getItemHeight   = getItemHeight;
  
  //check login, redirect if necessary
  LoginFactory.checkLogin();

  //load inbox
  vm.refresh();

  //timer to update TTLs on images
  timer = $interval(updateTimers, 1000);

  $scope.$on('updateInbox', function(event, photos) {
    console.log('onUpdateInbox');
    vm.add(photos, vm.inbox);
    AlbumFactory.createThumbData(vm.inbox);
    $scope.$broadcast('scroll.refreshComplete');
  });

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

  function updateTimers() {
    var photosToRemove = [];
    vm.inbox.forEach(function(photo) {
      photo.timeRemaining = (photo.TTL - (Date.now() - photo.timestamp) );
      if (photo.timeRemaining <= 0)
        photosToRemove.push(photo);
    });
    while(photosToRemove.length)
      vm.remove(photosToRemove.pop(), vm.inbox);
  }

  function deleteFromInbox(photo) {
    vm.remove(photo, vm.inbox);
    InboxFactory.deleteFromInbox(photo);
  }

  function saveToAlbum(photo) {
    AlbumFactory.saveToAlbum(photo);
  }

  function reBroadCast(photo) {
    var rebroadcastPhoto = _.clone(photo);
    BroadCastFactory.reBroadCast(rebroadcastPhoto, function() {
      vm.isDisabled[photo.photoId] = true;
    });
  }

  function refresh() {
    console.log('refresh');
    InboxFactory.requestInbox();
  }

  function getItemHeight() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return Math.floor(width/2);
  }

}
