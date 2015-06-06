angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$interval', 'InboxFactory', 'User', 'LoginFactory', 'BroadCastFactory', 'API_HOST'];

function InboxCtrl($scope, $interval, InboxFactory, User, LoginFactory, BroadCastFactory, API_HOST) {
  console.log('InboxCtrl');

  var vm = this;

  vm.inbox = User.inbox;
  vm.url = User.url;
  vm.deleteFromInbox = deleteFromInbox;
  vm.saveToAlbum = saveToAlbum;
  vm.reBroadCast = reBroadCast;
  vm.refresh = refresh;

  //TODO: make this work
  //When the controller is loaded, see if the user is logged in, start sending GPS
  LoginFactory.checkLogin();

  //when the controller is instantiated the first thing it does is call refresh
  //which calls a function that requests the inbox from factory
  vm.refresh();

  //update inbox when changed by factory
  $scope.$on('updateInbox', function(event, data) {
    console.log('onUpdateInbox');
    vm.inbox = User.inbox();
  });

  //timer to update TTLs on images
  timer = $interval(updateTimers, 1000);

  function updateTimers() {
    vm.inbox.forEach(function(photo) {
      photo.timeRemaining = (photo.TTL - (Date.now() - photo.timestamp) );
      if (photo.timeRemaining <= 0)
        User.inbox('remove', photo);
    });

    vm.inbox = User.inbox();
  }


  //TODO: redraw after picture deleted from inbox
  function deleteFromInbox(photo) {
    vm.inbox = User.inbox('remove', photo);
    InboxFactory.deleteFromInbox(photo);
  }


  function saveToAlbum(photo) {
    AlbumFactory.saveToAlbum(photo);
    User.album('add',photo);
  }


  //TODO: TEST
  //TODO: check if photo has been broadcast already?
  function reBroadCast(photo) {
    BroadCastFactory.reBroadCast(photo);
  }


  function refresh() {
    console.log('Inbox.refresh');
    console.log('refresh');
    InboxFactory.requestInbox();
    $scope.$broadcast('scroll.refreshComplete');
  }

}
