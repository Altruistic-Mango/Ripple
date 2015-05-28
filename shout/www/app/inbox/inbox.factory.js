angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope'];  

function InboxFactory($rootScope) {
  console.log('InboxFactory');
  var services = {};
  //this is some dummy data for testing the inbox functionality
  services.photos = [
    {
      photoId: 1,
      TTL: 5, 
      radius: 5,
      //for testing it has a url
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg'
    },
    {
      photoId: 2,
      TTL: 5, 
      radius: 5,
      //for testing it has a url
      src: 'http://images.wisegeek.com/mango.jpg'
    },
    {
      photoId: 3,
      TTL: 5, 
      radius: 5,
      //for testing it has a url
      src: 'http://goodfruitguide.co.uk/wp-content/uploads/2010/10/Mango-general-cut.jpg'
    },
    {
      photoId: 4,
      TTL: 5, 
      radius: 5,
      //for testing it has a url
      src: 'http://www.mumbairangers.com/wp-content/uploads/2015/04/kkk.jpg'
    }
  ];

  services.updateInbox = updateInbox; 
  services.getPhotos = getPhotos;
  services.removeExpired = removeExpired; 
  services.filterForNew = filterForNew;

  return services;

  function updateInbox(data) {
    console.log('update inbox called');
    services.photos = data;
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
    })
    console.log('removeExpired called!');
    var newInbox = _.filter(oldInbox, function(photo) {
      return _.contains(idArray, photo.photoId); 
    })
    console.log('new inbox: ', newInbox)
    return newInbox;
  }

  function filterForNew(oldInbox, newData){
    var oldIdArray = [];
    console.log('filterForNew called with oldInbox: ', oldInbox);
    oldInbox.forEach(function(item) {
      oldIdArray.push(item.photoId);
    })
    var newPhotos = _.filter(newData, function(photo) {
      return !_.contains(oldIdArray, photo.Id);
    })
    console.log('the new photos: ', newPhotos);
    return newPhotos; 
  }

}

