angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory', '$localstorage', '$http', 'API_HOST'];

function AlbumCtrl($scope, $state, AlbumFactory, $localstorage, $http, API_HOST) {
  console.log('AlbumCtrl');
  var vm = this;
  vm.photos = [];
  vm.addPhotos = addPhotos;
  vm.getSrc = getSrc; 
  vm.deleteFromAlbum = deleteFromAlbum;

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
  function deleteFromAlbum(index) {
    console.log('deleting photo:',index);
    var photo = vm.photos.splice(index,1)[0];
    console.log(photo);
    var data = {};
    data.userId = $localstorage.get('userId');
    data.photoId = photo.photoId;
    console.log(data);
    $http.post(API_HOST + '/photos/deleteFromAlbum/', data)
         .success(function(data) {
            console.log('success deleteing photo from inbox');
         })
         .error(function(){console.log('error deleting photo from inbox');});
  }

  function getSrc(photoId) {
    return "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/" + photoId + ".jpeg";
  }

}
