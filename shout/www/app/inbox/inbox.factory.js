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

  services.newInbox = [
        {
          photoId: 2,
          TTL: 5, 
          radius: 5,
          //for testing it has a url
          src: 'http://images.wisegeek.com/mango.jpg'
        },
        {
          photoId: 100,
          TTL: 5, 
          radius: 5,
          //for testing it has a url
          src: 'https://nuts.com/images/auto/801x534/assets/8610c9770444a3c4.jpg'
        },
        {
          photoId: 3,
          TTL: 5, 
          radius: 5,
          //for testing it has a url
          src: 'http://goodfruitguide.co.uk/wp-content/uploads/2010/10/Mango-general-cut.jpg'
        },
        {
          photoId: 200,
          TTL: 5, 
          radius: 5,
          //for testing it has a url
          src: 'http://www.nutstop.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/mango-fancy.jpg'
        },
        {
          photoId: 300,
          TTL: 5, 
          radius: 5,
          //for testing it has a url
          src: 'https://www.nuttyandfruity.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/r/dried_mango_slices_extra_low_sugar.jpg'
        },
        {
          photoId: 400,
          TTL: 5, 
          radius: 5,
          //for testing it has a url
          src: 'http://www.foodsubs.com/Photos/driedfruit-mango.jpg'
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
  services.checkValidPhoto = checkValidPhoto;

  //for testing: 
  // setInterval(services.updateInbox, 5000, services.newInbox);

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
    console.log('oldIdArray: ', oldIdArray);
    var newPhotos = _.filter(newData, function(photo) {
      return !_.contains(oldIdArray, photo.photoId);
    })
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

}

