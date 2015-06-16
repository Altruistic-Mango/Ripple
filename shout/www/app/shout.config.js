angular
  .module('shout')
  .config(configure);
configure.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider', '$sceDelegateProvider', '$ionicConfigProvider'];

function configure($stateProvider, $urlRouterProvider, $compileProvider, $sceDelegateProvider, $ionicConfigProvider) {
  console.log('shout configure');
  
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data):/);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/**'
  ]);
  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl as vm'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'app/login/signup.html',
    controller: 'SignupCtrl as vm'
  })

  .state('review', {
    url: '/review',
    templateUrl: 'app/review/tab-review.html',
    controller: 'ReviewCtrl as vm'
  })

  .state('broadcast', {
    url: '/broadcast',
    templateUrl: 'app/broadcast/tab-broadcast.html',
    controller: 'BroadCastCtrl as vm'
  })

  //setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/layout/tabs.html',
    controller: 'TabsCtrl as vm'
  })

  //Each tab has its own nav history stack:
  .state('tab.inbox', {
    url: '/inbox',
    views: {
      'tab-inbox': {
        templateUrl: 'app/inbox/tab-inbox.html',
        controller: 'InboxCtrl as vm'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'app/settings/tab-settings.html',
        controller: 'SettingsCtrl as vm'
      }
    }
  })

  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'app/camera/tab-camera.html',
        controller: 'CameraCtrl as vm'
      }
    }
  })

  .state('tab.album', {
    url: '/album',
    views: {
      'tab-album': {
        templateUrl: 'app/album/tab-album.html',
        controller: 'AlbumCtrl as vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}
