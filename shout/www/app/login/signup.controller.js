angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state', 'SignupFactory'];

function SignupCtrl($state, SignupFactory) {
  console.log('SignupCtrl');
  var vm = this;
  vm.data; 

  vm.signup = signup;
  
  function signup() {
    console.log('vm.data: ', vm.data);
    SignupFactory.signupUser(vm.data)
                 .then(function (res) {
                    console.log('response from server on singup: ', res);
                    if (res.status === 200){
                      $state.go('login');
                    }
                  });
  }
  
}
