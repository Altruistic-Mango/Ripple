angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$scope', '$state', 'AlbumFactory'];

function AlbumCtrl($scope, $state, AlbumFactory) {
  console.log('AlbumCtrl');
  var vm = this;
  vm.photos = [];
  vm.addPhotos = addPhotos;
  vm.getSrc = getSrc; 
  vm.photo = {timestamp : Date.now() - 0.7*60*1000,
              title: 'Berkeley',
              broadcasts: 11,
              imgSrc: 'img/berkeley.jpg',
              TTL: 5*60};
  vm.photo2 = {timestamp : Date.now() - 2.3*60*1000,
              title: 'San Francisco',
              broadcasts: 3,
              imgSrc: 'img/goldengate.jpg',
              TTL: 5*60};

  vm.dummyphotos = [];
  vm.dummyphotos.push(vm.photo, vm.photo2);

  AlbumFactory.getAlbum();

  $scope.$on('updateAlbum', function(event, data) {
    vm.photos = vm.photos.concat(data);
  });

  function addPhotos(photos) {
    vm.photos = vm.photos.concat(photos);
  }

  function getSrc(photoId){
    return "https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/" + photoId + ".jpeg";
  }

}

