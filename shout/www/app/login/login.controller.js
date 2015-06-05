angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$state', 'LoginFactory', 'ionicMaterialInk'];

function LoginCtrl($state, LoginFactory, ionicMaterialInk) {
  console.log('LoginCtrl');
  var vm = this;
  vm.data = {};
  vm.data.username = '';
  vm.data.email = '';
  vm.data.password = '';
  vm.login = login;
  vm.splash = splash;
  vm.badCombo = false;

  ionicMaterialInk.displayEffect();

  //TODO:Form validation for all required fields
  //TODO: username exists, password incorrect 
  //TODO: no username error
  //TODO: facebook auth
  function login() {
    ionicMaterialInk.displayEffect();
    vm.data.username = vm.data.username.toLowerCase();
    LoginFactory.loginUser(vm.data)
      .success(function(res) {
        LoginFactory.successfulLogin(res);
        $state.go('tab.inbox');
      })
      .error(function(res) {
        console.log('error on login');
        vm.badCombo = true;
      });
  }

  function splash() {
    ionicMaterialInk.displayEffect();
  }
}
