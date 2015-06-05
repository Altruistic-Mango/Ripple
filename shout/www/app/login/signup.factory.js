angular
  .module('shout.signup')
  .factory('SignupFactory', SignupFactory);

SignupFactory.$inject = ['$http', '$localstorage', 'API_HOST'];

function SignupFactory($http, $localstorage, API_HOST) {
  var services = {};
  services.signupUser = signupUser;
  services.validateUser = validateUser;
  services.storeCredentials = storeCredentials;

  return services;

  function signupUser(data) {
    console.log('signup data: ', data);
    return $http({
      method: 'POST',
      url: API_HOST + '/users/signup',
      data: data
    });
  }

  function validateUser(username) {
    var regex = /^[a-zA-Z\d]{5,15}$/;
    if (regex.test(username)) {
        return true;
    }
    else {
        return false;
    }
  }

  function storeCredentials(data) {
    $localstorage.set('userId', data.userId);
  }
  
}
