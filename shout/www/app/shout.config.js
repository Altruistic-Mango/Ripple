// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular
  .module('shout')
  .config(configure);


function configure($stateProvider, $urlRouterProvider) {
 console.log('config run!!!!');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login', 
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  })
  //setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "app/layout/tabs.html"
  })

  // // Each tab has its own nav history stack:

  .state('tab.inbox', {
    url: '/inbox',
    views: {
      'tab-inbox': {
        templateUrl: 'app/inbox/tab-inbox.html',
        controller: 'InboxCtrl'
      }
    }
  })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

};
