angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory'];

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory, CameraFactory) {
  console.log('InboxCtrl');
  var vm = this;
  var currentStart = 0

  //when user clicks save on a photo call AlbumFactory.savePhoto();
  vm.photos = [];
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
  vm.addPhotos = addPhotos; 

  $scope.$on('updateInbox', function (event, data) {
    console.log('update inbox event heard!!!', data); 
    vm.photos = data; 
  });

  vm.addPhotos(); 

  function addPhotos() {
    console.log('inf scroll addPhotos called!!!');
    for (var i = currentStart; i < currentStart + 5; i++) {
      if (InboxFactory.photos[i]) {
        vm.photos.push(InboxFactory.photos[i]);
      }
    }
    currentStart += 5; 
    $scope.$broadcast('scroll.infiniteScrollComplete')
  }

}




