angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$interval', 'InboxFactory', 'AlbumFactory', 'User', 'LoginFactory', 'BroadCastFactory', 'ionicMaterialInk', 'API_HOST'];

function InboxCtrl($scope, $interval, InboxFactory, AlbumFactory, User, LoginFactory, BroadCastFactory, ionicMaterialInk, API_HOST) {
  console.log('InboxCtrl');
  ionicMaterialInk.displayEffect({'duration':2000});

  var vm = this;

  vm.inbox.length;
  vm.inbox = [];
  vm.url = User.url;
  vm.deleteFromInbox = deleteFromInbox;
  vm.saveToAlbum = saveToAlbum;
  vm.reBroadCast = reBroadCast;
  vm.refresh = refresh;
  vm.add = InboxFactory.add;
  vm.remove = InboxFactory.remove;

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


  function deleteFromInbox(photo) {
    vm.remove(photo, vm.inbox);
    InboxFactory.deleteFromInbox(photo);
  }


  function saveToAlbum(photo) {
    AlbumFactory.saveToAlbum(photo);
  }


  //TODO: TEST
  //TODO: check if photo has been broadcast already?
  function reBroadCast(photo) {
    BroadCastFactory.reBroadCast(photo);
  }

  function refresh() {
    console.log('refresh');
    InboxFactory.requestInbox();
  }

}
