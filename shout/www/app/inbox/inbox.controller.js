angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory'];

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory, CameraFactory) {
  console.log('InboxCtrl');
  var vm = this;
  var currentStart = 0;
  var morePhotosVar = true; 

  //when user clicks save on a photo call AlbumFactory.savePhoto();
  vm.photos = [];
  vm.newPhotos = [];
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
  vm.addPhotos = addPhotos; 
  vm.morePhotos = morePhotos;
  vm.doRefresh = doRefresh;

  vm.addPhotos(); 


  $scope.$on('updateInbox', function (event, data) {
    console.log('update inbox event heard!!!', data); 
    vm.photos = [];
    vm.addPhotos(); 
  });

  function doRefresh() {
    console.log('doRefresh called');
    clearInbox();
    $scope.$broadcast('scroll.refreshComplete');
  }


  function addPhotos() {
    console.log('inf scroll addPhotos called!!!');
    // vm.photos = vm.photos.concat(InboxFactory.photos);
    for (var i = currentStart; i < currentStart + 5; i++) {
      if (InboxFactory.photos[i]) {
        vm.photos.push(InboxFactory.photos[i]);
      }
    }
    currentStart += 5; 
    $scope.$broadcast('scroll.infiniteScrollComplete')
  }

  function morePhotos() {
    console.log('morePhotos called');
    return morePhotosVar; 
  }

  function clearInbox() {
    vm.photos = InboxFactory.removeExpired(vm.photos, InboxFactory.dummyPhotos);
  }

}




