angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope', '$http', '$interval', 'CameraFactory', 'User', 'API_HOST'];

function InboxFactory($rootScope, $http, $interval, CameraFactory, User, API_HOST) {
  console.log('InboxFactory');

  var inbox = [];
  var timer = $interval(updateTimers, 1000);

  requestInbox();

  var services = {};

  services.inbox           = inbox;
  services.requestInbox    = requestInbox;
  services.addToInbox      = addToInbox;
  services.deleteFromInbox = deleteFromInbox;
  services.newphotos       = [];

  return services;

  function updateTimers() {
    var photosToRemove = [];
    inbox.forEach(function(photo) {
      photo.timeRemaining = (photo.TTL - (Date.now() - photo.timestamp) );
      if (photo.timeRemaining <= 0)
        photosToRemove.push(photo);
    });
    while(photosToRemove.length)
      User.remove(photosToRemove.pop(), vm.inbox);
  }

  function requestInbox() {
    $http.get(API_HOST + '/users/inbox/' + User.userId())
      .success(function(data) {
        inbox = data;
        
        CameraFactory.createThumbData(inbox);
        updateInbox();
      })
      .error(function() {
        console.log('error getting inbox'); 
      });
  }

  function addToInbox(photos) {
    User.add(photos, inbox);
    updateInbox();
  }

  function deleteFromInbox(photo) {
    User.remove(photo, inbox);
    updateInbox();

    var data = {
      userId: User.userId(),
      photoId: photo.photoId
    };

    $http.post(API_HOST + '/photos/delete/', data)
      .success(function(data) {
      })
      .error(function() {
        console.log('error deleting photo from inbox');
      });
  }

  function updateInbox() {
    $rootScope.$broadcast('updateInbox', inbox);
  }
}
