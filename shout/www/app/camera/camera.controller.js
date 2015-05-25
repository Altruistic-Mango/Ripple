angular
  .module('shout.camera')
  .controller('CameraCtrl', CameraCtrl);

CameraCtrl.$inject = ['$scope', '$state', '$location'];

function CameraCtrl($scope, $state, $location) {
  console.log('CameraCtrl');
}
