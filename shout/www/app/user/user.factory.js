angular
  .module('shout.user')
  .factory('User', User);

User.$inject = ['$localstorage'];

function User($localstorage) {
  console.log('User');

  var user = {};

  //volatile
  var _position = {};

  //grab user data if present
  loadUser();

  //services
  var services = {};
  services.newUser = newUser;
  services.saveUser = saveUser;
  services.userId = userId;
  services.url = url;
  services.isSignedIn = isSignedIn;
  services.position = position;
  services.settings = settings;
  services.album = album;
  services.fbId = fbId;

  return services;

  //creates a new user, used during signup
  function newUser(data) {
    //persistent data
    console.log(JSON.stringify(data));
    user.userId = data.userId;
    user.username = data.username;
    user.url = data.url || 'https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/';
    user.isSignedIn = true;
    user.album = [];
    user.fbId = data.fbId || null;

    user.settings = {
      enabled: true,
      trickle: true,
      radius: 5,
      TTL: 5,
    };

    save(user);

    //volatile data
    //  position grabbed from hardware
    _position = {
      x: 0,
      y: 0
    };
  }

  function saveUser(data) {
    user = $localstorage.getObject('user');

    if (user.userId) {
      user.userId = data.userId;
      user.username = data.username;
      user.url = data.url || 'https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/';
      save(user);
    } else {
      newUser(data);
    }
  }

  //gets/sets userId
  function userId(Id) {
    if (arguments.length === 0)
      return user.userId;
    else {
      user.userId = Id;
      save(user);
    }
  }


  //gets/sets facebookId
  function fbId(token) {
    if (arguments.length === 0)
      return user.fbId;
    else {
      user.fbId = token;
      save(user);
    }
  }


  function url(photoId) {
    return user.url + photoId + '.jpeg';
  }


  //gets/sets isSignedIn
  function isSignedIn(value) {
    if (arguments.length === 0)
      return user.isSignedIn;
    else {
      user.isSignedIn = value;
      save(user);
    }
  }


  //gets/sets position
  function position(newPosition) {
    if (arguments.length === 0)
      return _position;
    else if (arguments.length === 2) {
      _position.x = newPosition.x;
      _position.y = newPosition.y;
    }
  }


  //gets/sets settings
  //example for set:
  //  settings(Obj) -> stores settings object
  //  settings(key, value) -> stores key/value pairs
  function settings() {
    var args = Array.prototype.slice.call(arguments);
    if (arguments.length === 0)
      return user.settings;
    else if (args.length === 1 && arguments[0] instanceof Object) {
      user.settings = args[0];
    } else {
      while (args.length >= 2) {
        var key = args.shift();
        var value = args.shift();
        user.settings[key] = value;
        save(user);
      }
    }
  }


  //gets/sets album
  //album() returns album
  //album('add', photo) adds a photo
  //album('remove', photo) removes a photo
  function album(addRemove, photo) {
    if (arguments.length === 0)
      return user.album;
    else if (addRemove === 'add')
      add(photo);
    else if (addRemove === 'remove')
      remove(photo);

    function add(photo) {
      var photoIds = {};

      user.album.forEach(function(photo) {
        photoIds[photo.photoId] = true;
      });

      if (!photoIds.hasOwnProperty(photo.photoId)) {
        user.album.push(photo);
        save(user);
        return true;
      }

      return false;
    }

    function remove(photo) {
      var index = user.album.indexOf(photo);
      if (index !== -1)
        user.album.splice(index, 1);
      save(user);
    }

  }

  //Internal Functions
  function loadUser() {
    user = $localstorage.getObject('user') || services.newUser(); 
  }

  function save(user) {
    $localstorage.setObject('user', user);
  }
}
