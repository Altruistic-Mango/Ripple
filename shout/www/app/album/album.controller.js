angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory', 'InboxFactory', 'User', '$http', 'API_HOST'];

function AlbumCtrl($scope, $state, AlbumFactory, InboxFactory, User, $http, API_HOST) {
  console.log('AlbumCtrl');

  var vm = this;

  vm.album = User.album();
  vm.url = User.url;
  vm.deleteFromAlbum = deleteFromAlbum;
  vm.add = InboxFactory.add;
  vm.remove = InboxFactory.remove;

  console.log(vm.album);

  $scope.$on('updateAlbum', function(event) {
    console.log('onUpdateAlbum');
    vm.add(User.album(), vm.album);
  });

  function deleteFromAlbum(photo) {
    console.log('deleteFromAlbum');
    vm.remove(photo, vm.album);
    User.album('remove', photo);
    AlbumFactory.deleteFromAlbum(photo);
  }
}
