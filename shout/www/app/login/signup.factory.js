angular
  .module('shout.signup')
  .factory('SignupFactory', SignupFactory);

SignupFactory.$inject = ['$http', '$localstorage', 'API_HOST'];

function SignupFactory ($http, $localstorage, API_HOST) {
  var services = {};
  services.signupUser = signupUser;

  return services; 

  function signupUser (data) {
    console.log('signup data: ', data);
    return $http({
      method: 'POST',
      url: API_HOST + '/users/signup',
      data: data
    })
  }
}