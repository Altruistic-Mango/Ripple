angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$state', 'LoginFactory', 'ionicMaterialInk'];

function LoginCtrl($state, LoginFactory, ionicMaterialInk) {
  console.log('LoginCtrl');
  var vm = this;
  vm.data = {};
  vm.data.username = 'mb';
  vm.data.email = 'm@b.com';
  vm.data.password = 'mb';
  vm.login = login;
  vm.splash = splash;
  vm.badCombo = false;

  ionicMaterialInk.displayEffect();

  function login() {
    console.log('vm.data: ', vm.data);
    ionicMaterialInk.displayEffect();
    LoginFactory.loginUser(vm.data)
      .success(function(res) {
        console.log('res from server on login: ', res);
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
