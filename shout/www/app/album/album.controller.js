angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory'];

function AlbumCtrl($scope, $state, AlbumFactory) {
  console.log('AlbumCtrl');
  var vm = this;
  vm.photos = [];
  vm.addPhotos = addPhotos;

  AlbumFactory.getAlbum();

  $scope.$on('updateAlbum', function(event, data) {
    vm.photos = vm.photos.concat(data);
  });

  function addPhotos(photos) {
    vm.photos = vm.photos.concat(photos);
  }

}

