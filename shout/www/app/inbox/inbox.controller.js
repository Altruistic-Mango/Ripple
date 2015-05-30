angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory', 'BroadcastFactory'];

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory, CameraFactory, BroadcastFactory) {
  console.log('InboxCtrl');
  var vm = this;
  var currentStart = 0;

  vm.photos = [];
  vm.newPhotos = [];
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
  vm.addPhotos = addPhotos;
  vm.doRefresh = doRefresh;
  vm.loadMore = loadMore;
  vm.reBroadcast = reBroadcast;
  vm.saveToAlbum = saveToAlbum;
  vm.clearInbox = clearInbox;
  vm.morePhotosVar = false;
  vm.canScroll = false;

  vm.addPhotos(InboxFactory.photos);

  $scope.$on('updateInbox', function(event, data) {
    console.log('update inbox event heard!!!');
    newPhotos = InboxFactory.filterForNew(vm.photos, InboxFactory.photos);
    vm.clearInbox();
    vm.addPhotos(newPhotos);
  });

  function doRefresh() {
    console.log('doRefresh called');
    vm.clearInbox();
    $scope.$broadcast('scroll.refreshComplete');
  }

  function loadMore() {
    console.log('loadMore called');
    if (vm.morePhotosVar) {
      vm.canScroll = true;
    } else {
      vm.canScroll = false;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  function addPhotos(photos) {
    vm.photos = vm.photos.concat(photos);
    vm.morePhotosVar = true;
  }

  function clearInbox() {
    vm.photos = InboxFactory.removeExpired(vm.photos, InboxFactory.photos);

  }

  function reBroadcast(index) {
    if (InboxFactory.checkValidPhoto(vm.photos[index])) {
      BroadcastFactory.reBroadcast(vm.photos[index]);
    } else {
      console.log('that photo is expired, refresh your inbox!');
    }
  }

  function saveToAlbum(index) {
    AlbumFactory.savePhoto(vm.photos[index]);
  }

}
