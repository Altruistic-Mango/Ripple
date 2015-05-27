angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope'];  

function InboxFactory($rootScope) {
  console.log('InboxFactory');
  var services = {};
  //this is some dummy data for testing the inbox functionality
  services.photos = [];
  services.updateInbox = updateInbox; 
  services.getPhotos = getPhotos;
  services.removeExpired = removeExpired; 
  services.filterForNew = filterForNew;

  return services;

  function updateInbox(data) {
    console.log('update inbox called');
    services.photos = data.inbox;
    $rootScope.$broadcast('updateInbox', services.photos); 
  }
  function getPhotos(){
    return services.photos; 
  }

  function removeExpired(oldInbox, newData){
    console.log('removeExpired called with oldInbox: ', oldInbox);
    var idArray = [];
    newData.forEach(function(item) {
      idArray.push(item.number);
    })
    console.log('removeExpired called!');
    var newInbox = _.filter(oldInbox, function(photo) {
      return _.contains(idArray, photo.number); 
    })
    console.log('new inbox: ', newInbox)
    return newInbox;
  }

  function filterForNew(oldInbox, newData){
    var oldIdArray = [];
    console.log('filterForNew called with oldInbox: ', oldInbox);
    oldInbox.forEach(function(item) {
      oldIdArray.push(item.number);
    })
    var newPhotos = _.filter(newData, function(photo) {
      return !_.contains(oldIdArray, photo.number);
    })
    console.log('the new photos: ', newPhotos);
    return newPhotos; 
  }

}

