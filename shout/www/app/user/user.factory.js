angular
  .module('shout.user')
  .factory('User', User);

User.$inject = ['$localstorage'];

function User($localstorage) {
  var user = {};

  //volatile
  var _position = {};
  var _inbox = [];

  //grab user data if present
  loadUser();

  //services
  var services = {};
  services.newUser = newUser;
  services.userId = userId;
  services.isSignedIn = isSignedIn;
  services.position = position;
  services.settings = settings;
  services.album = album;

  return services;

  //creates a new user, used during signup
  function newUser(data) {
    //persistent data
    console.log(JSON.stringify(data))
    user.userId = data.userId;
    user.username = data.username;
    user.isSignedIn = true;
    user.album = [];
    user.fbId = data.fbId;

    user.settings = {
      enabled: true,
      radius: 5,
      TTL: 5,
    };

    save(user);

    //volatile data
    //  inbox must be grabbed from server
    //  position grabbed from hardware
    _inbox = [];
    _position = {
      x: 0,
      y: 0
    };
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
    else if (args.length === 1) {
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


  //gets/sets inbox
  //inbox() returns inbox
  //inbox('add', photo) adds a photo
  //inbox('remove', photo) removes a photo
  function inbox(addRemove, photo) {
    if (arguments.length === 0)
      return _inbox;
    else if (addRemove === 'add')
      add(photo);
    else if (addRemove === 'remove')
      remove(photo);

    function add(photo) {
      if (!_contains(_inbox, photo.photoId)) {
        _inbox.push(photo.photoId);
        save(user);
      }
    }

    function remove(photo) {
      var index = _inbox.indexOf(photo.photoId);
      if (index !== -1)
        _inbox.splice(index, 1);
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
      if (!_contains(user.album, photo.photoId)) {
        user.album.push(photo.photoId);
        save(user);
      }
    }

    function remove(photo) {
      var index = user.album.indexOf(photo.photoId);
      if (index !== -1)
        user.album.splice(index, 1);
      save(user);
    }
  }

  //Internal Functions
  function loadUser() {
    user = $localstorage.getObject('user') || {};
  }

  function save(user) {
    $localstorage.setObject('user', user);
  }
}
