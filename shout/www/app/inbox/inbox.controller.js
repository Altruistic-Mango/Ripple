angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', '$interval', 'InboxFactory', 'AlbumFactory', 'CameraFactory', 'BroadCastFactory'];

function InboxCtrl($scope, $state, $interval, InboxFactory, AlbumFactory, CameraFactory, BroadCastFactory) {
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
  vm.reBroadCast = reBroadCast;
  vm.saveToAlbum = saveToAlbum;
  vm.deleteFromInbox = deleteFromInbox;
  vm.clearInbox = clearInbox;
  vm.getSrc = getSrc;
  vm.morePhotosVar = false;
  vm.canScroll = false;

  vm.photo = {timestamp : Date.now() - 0.7*60*1000,
              title: 'Berkeley',
              broadcasts: 11,
              photoId: 'berkeley',
              TTL: 5*60};
  vm.photo2 = {timestamp : Date.now() - 2.3*60*1000,
              title: 'San Francisco',
              broadcasts: 3,
              photoId: 'goldengate',
              TTL: 5*60};

  //vm.dummyphotos = [];
  //vm.dummyphotos.push(vm.photo, vm.photo2);
  vm.photos.push(vm.photo, vm.photo2);

  timer = $interval(updateTime, 1000);

  function deleteFromInbox(index) {
    console.log('deleting photo:',index);
    vm.photos.splice(index,1);
  }

  function updateTime() {
    vm.photos.forEach(function(photo) {
      photo['timeRemaining'] = photo.TTL*1000 - (Date.now() - photo.timestamp);
    });
  }

  vm.addPhotos(InboxFactory.photos);

  $scope.$on('updateInbox', function(event, data) {
    console.log('update inbox event heard!!!');
    newPhotos = InboxFactory.filterForNew(vm.photos, InboxFactory.photos);
    vm.clearInbox();
    vm.addPhotos(newPhotos);
  });

  function doRefresh() {
    console.log('doRefresh called');
    InboxFactory.requestInbox();
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

  function reBroadCast(index) {
    if (InboxFactory.checkValidPhoto(vm.photos[index])) {
      BroadCastFactory.reBroadCast(vm.photos[index]);
    } else {
      console.log('that photo is expired, refresh your inbox!');
    }
  }

  function saveToAlbum(index) {
    AlbumFactory.savePhoto(vm.photos[index]);
  }

  function getSrc(photoId){
    return "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/" + photoId + ".jpeg";
  }

}
