angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope', '$http', 'User', 'API_HOST'];

function InboxFactory($rootScope, $http, User, API_HOST) {
  console.log('InboxFactory');

  var services = {};

  services.requestInbox = requestInbox;
  services.deleteFromInbox = deleteFromInbox;
  services.updateInbox = updateInbox;
  services.newphotos = [];
  services.add = add;
  services.remove = remove;

  return services;


  function requestInbox() {
    console.log('InboxFactory requestInbox');

    $http.get(API_HOST + '/users/inbox/' + User.userId())
      .success(function(data) {
        updateInbox(data);
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

  function updateInbox(photos) {
    $rootScope.$broadcast('updateInbox', photos);
  }
    
  function add(photos, collection) {
    if (!(photos instanceof Array))
      photos = [photos];

    var photoIds = {};

    collection.forEach(function(photo) {
      photoIds[photo.photoId] = true;
    });

    photos.forEach(function(photo) {
      if (!photoIds.hasOwnProperty(photo.photoId)) {
        collection.push(photo);
      }
    });
  }

  function remove(photo, collection) {
    var index = collection.indexOf(photo);
    if (index !== -1)
      collection.splice(index, 1);
  }

}
