angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory'];

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory, CameraFactory) {
  console.log('InboxCtrl');
  var vm = this;
  var currentStart = 0;

  //when user clicks save on a photo call AlbumFactory.savePhoto();
  vm.photos = [];
  vm.newPhotos = [];
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
  vm.addPhotos = addPhotos; 
  vm.doRefresh = doRefresh;
  vm.loadMore = loadMore; 
  vm.morePhotosVar;
  vm.canScroll; 

  vm.addPhotos(InboxFactory.photos); 


  $scope.$on('updateInbox', function (event, data) {
    console.log('update inbox event heard!!!'); 
    newPhotos = InboxFactory.filterForNew(vm.photos, InboxFactory.photos);
    vm.addPhotos(newPhotos);
  });


  function doRefresh() {
    console.log('doRefresh called');
    clearInbox();
    $scope.$broadcast('scroll.refreshComplete');
  }

  function loadMore () {
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

}




