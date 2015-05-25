angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$state'];

function AlbumCtrl($state) {
  console.log('AlbumCtrl');
  var vm = this;

  vm.photos = [];
}
