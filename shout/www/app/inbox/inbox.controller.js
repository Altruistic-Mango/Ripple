angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$interval', 'InboxFactory', 'AlbumFactory', 'User', 'LoginFactory', 'BroadCastFactory', 'ionicMaterialInk', 'API_HOST', '$ionicModal'];

function InboxCtrl($scope, $interval, InboxFactory, AlbumFactory, User, LoginFactory, BroadCastFactory, ionicMaterialInk, API_HOST, $ionicModal) {
  console.log('InboxCtrl');
  ionicMaterialInk.displayEffect({'duration':2000});

  var vm = this;

  vm.inbox = [];
  vm.url = User.url;
  vm.deleteFromInbox = deleteFromInbox;
  vm.saveToAlbum = saveToAlbum;
  vm.reBroadCast = reBroadCast;
  vm.refresh = refresh;
  vm.add = InboxFactory.add;
  vm.remove = InboxFactory.remove;
  vm.isDisabled = {};
  vm.openModal = openModal;
  vm.closeModal = closeModal;


  //TODO: make this work
  //When the controller is loaded, see if the user is logged in, start sending GPS
  LoginFactory.checkLogin();

  //when the controller is instantiated the first thing it does is call refresh
  //which calls a function that requests the inbox from factory
  vm.refresh();

  //update inbox when changed by factory
  $scope.$on('updateInbox', function(event, photos) {
    console.log('onUpdateInbox');
    vm.add(photos, vm.inbox);
    AlbumFactory.createThumbData(vm.inbox);
    //Dummy photo for testing
    // if (!vm.inbox.length) {
    //   var photo = {
    //     photoId: 'goldengate',
    //     timestamp: Date.now(), 
    //     TTL: 5*1000*60,
    //     caption: 'The beautiful Golden Gate Bridge',
    //     url: vm.url('goldengate')
    //   };
    //   vm.add(photo, vm.inbox);
    // }
    $scope.$broadcast('scroll.refreshComplete');
  });

  //timer to update TTLs on images
  timer = $interval(updateTimers, 1000);

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

  function deleteFromInbox(photo) {
    vm.remove(photo, vm.inbox);
    InboxFactory.deleteFromInbox(photo);
  }

  function saveToAlbum(photo) {
    AlbumFactory.saveToAlbum(photo);
  }

  //TODO: check if photo has been broadcast already?
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

}
