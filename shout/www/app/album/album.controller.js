angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory', 'User', '$http', 'API_HOST'];

function AlbumCtrl($scope, $state, AlbumFactory, User, $http, API_HOST) {
  console.log('AlbumCtrl');

  var vm = this;

  vm.album = User.album();
  vm.url = User.url;
  vm.deleteFromAlbum = deleteFromAlbum;

  $scope.$on('updateAlbum', function(event) {
    console.log('onUpdateAlbum');
    vm.album = User.album();
  });

  function deleteFromAlbum(photo) {
    console.log('deleteFromAlbum');
    User.album('remove', photo);
    vm.album = User.album();
    AlbumFactory.deleteFromAlbum(photo);
  }

}
