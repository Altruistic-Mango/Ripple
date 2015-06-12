angular
  .module('shout')
  .run(run);

run.$inject = ['$http', '$state', 'User', 'API_HOST', '$ionicPlatform', '$ionicHistory'];

function run($http, $state, User, API_HOST, $ionicPlatform, $ionicHistory) {
  console.log('shout run');

  ionic.Platform.ready(function() {

    console.log('signed in?:',User.isSignedIn());
    if (User.isSignedIn()) {
      $state.go('tab.inbox');
    } else {
      $state.go('login');
    }

    //hide keyboard accessory
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // org.apache.cordova.statusbar required
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }

  });

  $ionicPlatform.registerBackButtonAction(function (event) {
      if($ionicHistory.currentStateName() === 'tab.inbox'){
        //do nothing
      }
      else {
        $ionicHistory.goBack();
      }
    }, 100);
}
