angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope', '$http', 'User', 'API_HOST'];

function InboxFactory($rootScope, $http, User, API_HOST) {
  console.log('InboxFactory');

  var services = {};

  services.requestInbox = requestInbox;
  services.deleteFromInbox = deleteFromInbox;

  return services;


  function requestInbox() {
    $http.get(API_HOST + '/users/inbox/' + User.userId())
      .success(function(data) {
        while(data) {
          Users.inbox('add',data.pop());
        }
        $rootScope.$broadcast('updateInbox');
      })
      .error(function() {
        console.log('error getting inbox');
      });
  }


  function deleteFromInbox(photo) {
    var data = {
      userId: User.userId(),
      photoId: photo.photoId
    };

    $http.post(API_HOST + '/photos/delete/', data)
      .success(function(data) {
        console.log('success deleteing photo from inbox');
      })
      .error(function() {
        console.log('error deleting photo from inbox');
      });
  }

}
