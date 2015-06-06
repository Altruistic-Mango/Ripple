angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope', '$http', '$localstorage', 'API_HOST'];

function InboxFactory($rootScope, $http, $localstorage, API_HOST) {
  console.log('InboxFactory');
  var services = {};
  services.photos = [];
  services.updateInbox = updateInbox;
  services.getPhotos = getPhotos;
  services.removeExpired = removeExpired;
  services.filterForNew = filterForNew;
  services.checkValidPhoto = checkValidPhoto;
  services.requestInbox = requestInbox; 


  return services;

  function updateInbox(data) {
    console.log('update inbox called');
    services.photos = data;
    console.log('inbox:',data);
    $rootScope.$broadcast('updateInbox', services.photos);
  }

  function getPhotos(){
    return services.photos;
  }

  function removeExpired(oldInbox, newData){
    console.log('removeExpired called with oldInbox: ', oldInbox);
    var idArray = [];
    newData.forEach(function(item) {
      idArray.push(item.photoId);
    });
    console.log('removeExpired called!');
    var newInbox = _.filter(oldInbox, function(photo) {
      return _.contains(idArray, photo.photoId);
    });
    console.log('new inbox: ', newInbox);
    return newInbox;
  }

  function filterForNew(oldInbox, newData){
    var oldIdArray = [];
    console.log('filterForNew called with oldInbox: ', oldInbox);
    oldInbox.forEach(function(item) {
      oldIdArray.push(item.photoId);
    });
    console.log('oldIdArray: ', oldIdArray);
    var newPhotos = _.filter(newData, function(photo) {
      return !_.contains(oldIdArray, photo.photoId);
    });
    console.log('the new photos: ', newPhotos);
    return newPhotos;
  }

  function checkValidPhoto(photo){
    currIdArray = [];
    services.photos.forEach(function(item) {
      currIdArray.push(item.photoId);
    });
    return _.contains(currIdArray, photo.photoId);
  }

  function requestInbox() {
    var user = $localstorage.getObject('user');
    var userId = user.userId; 
    $http.get(API_HOST + '/users/inbox/' + userId)
         .success(function(data) {
          console.log('success getting inbox');
          services.updateInbox(data);
         })
         .error(function(){console.log('error getting inbox');});
  }

}

