angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

InboxFactory.$inject = ['$rootScope'];  

function InboxFactory($rootScope) {
  console.log('InboxFactory');
  var services = {};

  services.photos = [
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 1
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 2
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 3
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 4
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 5
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 6
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 7
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 8
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 9
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 10
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 11
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 12
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 13
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 14
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 15
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 16
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 17
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 18
    }
  ];
  services.dummyPhotos = [    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 3
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 9
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 15
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 13
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 14
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 1
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 16
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 4
    },
    {
      src: 'http://www.alldayfitness.com/wp-content/uploads/2014/01/Mango.jpg',
      number: 18
    }
  ];
  services.updateInbox = updateInbox; 
  services.getPhotos = getPhotos;
  services.removeExpired = removeExpired; 
  return services;

  function updateInbox(data) {
    services.photos = data.inbox;
    $rootScope.$broadcast('updateInbox', services.photos); 
  }
  function getPhotos(){
    return services.photos; 
  }

  function removeExpired(oldInbox, newData){
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

}

