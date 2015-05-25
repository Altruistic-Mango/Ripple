angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['LocationFactory'];

function LoginFactory(LocationFactory) {
  

  var successfulLogin = function() {
    console.log('login factory successfulLogin called')
    LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
    LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback)
  }
  
  return {
    successfulLogin: successfulLogin
  }
}