angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', '$http', '$interval', '$localstorage', 'InboxFactory', 'AlbumFactory', 'CameraFactory', 'BroadCastFactory', 'API_HOST'];

function InboxCtrl($scope, $state, $http, $interval, $localstorage, InboxFactory, AlbumFactory, CameraFactory, BroadCastFactory, API_HOST) {
  console.log('InboxCtrl');
  var vm = this;
  var currentStart = 0;


  //TODO:kill images when TTL expires
  
  vm.photos = [];
  vm.newPhotos = [];
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
  vm.addPhotos = addPhotos;
  vm.doRefresh = doRefresh;
  vm.reBroadCast = reBroadCast;
  vm.saveToAlbum = saveToAlbum;
  vm.deleteFromInbox = deleteFromInbox;
  vm.clearInbox      = clearInbox;
  vm.getSrc          = getSrc;


  /*
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
              */

  //vm.dummyphotos = [];
  //vm.dummyphotos.push(vm.photo, vm.photo2);
  //vm.photos.push(vm.photo, vm.photo2);

  //timer to update TTLs on images
  timer = $interval(updateTime, 1000);

  //TODO: sent message to server, update the inbox
  //TODO: redraw after picture deleted from inbox
  function deleteFromInbox(index) {
    console.log('deleting photo:', index);
    var photo = vm.photos.splice(index, 1)[0];
    console.log(photo);
    var data = {};
    data.userId = $localstorage.get('userId');
    data.photoId = photo.photoId;
    console.log(data);
    $http.post(API_HOST + '/photos/delete/', data)
      .success(function(data) {
        console.log('success deleteing photo from inbox');
      })
      .error(function() {
        console.log('error deleting photo from inbox');
      });
  }

  //TODO fix this for real photos
  //  TTL will be in milliseconds
  //TODO remove photos if TTL expired
  function updateTime() {
    var photosToRemove = [];
    vm.photos.forEach(function(photo, index) {
      photo.timeRemaining = (photo.TTL - (Date.now() - photo.timestamp));
      if (photo.timeRemaining <= 0)
        photosToRemove.push(index);
    });
    while (photosToRemove.length) {
      vm.photos.splice(photosToRemove.pop(), 1);
    }
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

  function addPhotos(photos) {
    vm.photos = vm.photos.concat(photos);
    vm.morePhotosVar = true;
  }

  //TODO: deprecate this, expired photos controlled by timer
  function clearInbox() {
    vm.photos = InboxFactory.removeExpired(vm.photos, InboxFactory.photos);
  }

  function reBroadCast(index) {
    console.log('reBroadCast');
    if (InboxFactory.checkValidPhoto(vm.photos[index])) {
      BroadCastFactory.reBroadCast(vm.photos[index]);
    } else {
      console.log('that photo is expired, refresh your inbox!');
    }
  }

  function saveToAlbum(index) {
    AlbumFactory.savePhoto(vm.photos[index]);
  }

  function getSrc(photoId) {
    return "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/" + photoId + ".jpeg";
  }

}
