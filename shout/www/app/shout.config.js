angular
  .module('shout')
  .config(configure);

function configure($stateProvider, $urlRouterProvider) {
  console.log('shout configure');

  // Ionic uses AngularUI Router which uses the concept of states
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'app/login/signup.html',
    controller: 'SignupCtrl as vm'
  })

  //setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/layout/tabs.html'
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

  .state('tab.review', {
    url: '/review',
    views: {
      'tab-review': {
        templateUrl: 'app/review/tab-review.html',
        controller: 'ReviewCtrl as vm'
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

  /*
  .state('tab.camera', {
      url: '/camera',
      views: {
        'tab-camera': {
          templateUrl: 'app/camera/tab-camera.html',
          controller: 'CameraCtrl'
        }
      }
    })
    */
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
