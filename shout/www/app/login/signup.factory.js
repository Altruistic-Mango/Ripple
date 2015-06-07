angular
  .module('shout.signup')
  .factory('SignupFactory', SignupFactory);

SignupFactory.$inject = ['LoginFactory', '$http', '$localstorage', 'API_HOST'];

function SignupFactory(LoginFactory, $http, $localstorage, API_HOST) {
  var services = {};
  services.signupUser = signupUser;
  services.validateUser = validateUser;
  services.fbLogin = LoginFactory.fbLogin;
  services.loginFbUser = LoginFactory.loginFbUser;
  services.successfulLogin = LoginFactory.successfulLogin;
  services.fbLogin = LoginFactory.fbLogin;
  services.getUserInfo = LoginFactory.getUserInfo;
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
  
}
