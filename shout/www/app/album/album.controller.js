angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory'];

function AlbumCtrl($scope, $state, AlbumFactory) {
  console.log('AlbumCtrl');
  var vm = this;
  vm.photos = [];
  vm.addPhotos = addPhotos;
  vm.deletePhoto = deletePhoto;
  vm.getSrc = getSrc; 

  AlbumFactory.getAlbum();

  $scope.$on('updateAlbum', function(event, data) {
    vm.photos = vm.photos.concat(data);
  });

  function addPhotos(photos) {
    vm.photos = vm.photos.concat(photos);
  }

  //TODO: finish this function
  //  - delete from view
  //  - tell server to remove from album
  function deletePhoto(index) {

  }

  function getSrc(photoId){
    return "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/" + photoId + ".jpeg";
  }

}

