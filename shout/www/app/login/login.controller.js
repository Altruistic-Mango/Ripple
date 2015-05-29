angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$state','LoginFactory'];

function LoginCtrl($scope, $state, LoginFactory) {
  console.log('LoginCtrl');
  var vm = this;
  vm.data; 
  vm.login = login; 
  vm.badCombo = false; 

  function login () {
    console.log('vm.data: ', vm.data);
    LoginFactory.loginUser(vm.data)
                .success(function(res){
                  console.log('res from server on login: ', res);
                  LoginFactory.successfulLogin(res); 
                  $state.go('tab.inbox');
                })
                .error(function(res){
                  console.log('error on login');
                  vm.badCombo = true; 
                });
  }
}
