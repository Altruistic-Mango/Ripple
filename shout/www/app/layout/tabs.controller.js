angular
  .module('shout.tabs')
  .controller('TabsCtrl', TabsCtrl);

TabsCtrl.$inject = ['CameraFactory'];

function TabsCtrl(CameraFactory){
  vm = this; 

  vm.takePicture = CameraFactory.takePicture; 

}  