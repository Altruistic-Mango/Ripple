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
  vm.items = []; 
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
    for (var i = currentStart; i < currentStart + 10; i++) {
      vm.photos.push(InboxFactory.photos[i]);
      vm.items.push('Item ', i);
    }

    currentStart += 10; 
    $scope.$broadcast('scroll.infiniteScrollComplete')
  }


}




