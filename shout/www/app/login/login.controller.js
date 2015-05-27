angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$state','LoginFactory'];

function LoginCtrl($scope, $state, LoginFactory) {
  console.log('LoginCtrl');
  var vm = this;
  vm.data; 
  vm.login = login; 


  function login () {
    console.log('vm.data: ', vm.data);
    LoginFactory.loginUser(vm.data)
                .then(function(res){
                  console.log('res from server on login: ', res.data);
                  if (res.status === 200) {
                    LoginFactory.successfulLogin(res.data); 
                    $state.go('tab.inbox');
                  }
                });
  };
}
