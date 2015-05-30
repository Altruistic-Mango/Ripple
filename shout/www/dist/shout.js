angular.module('shout', [
  'ionic',
  'shout.constants',
  'shout.localstorage',
  'shout.tabs',
  'shout.login',
  'shout.signup',
  'shout.inbox',
  'shout.review',
  'shout.settings',
  'shout.camera',
  'shout.album',
  'shout.location',
  'shout.broadcast'
  //list the other modules that contain factories and controllers that you will use
]);

angular.module('shout.album', []);

angular.module('shout.broadcast', [
]);

angular.module('shout.camera', [
  //list the other modules that contain factories and controllers that you will use
]);

angular.module('shout.inbox', [
  //list the other modules that contain factories and controllers that you will use
  'shout.album',
  'shout.camera'
]);

angular.module('shout.tabs', [
  'shout.camera'
]);  
angular.module('shout.localstorage', [
  ]);
angular.module('shout.location', [
  //list the other modules that contain factories and controllers that you will use
]);

angular.module('shout.login', [
  //list the other modules that contain factories and controllers that you will use
  'shout.location', 
  'shout.localstorage'
]);

angular.module('shout.signup', [
//list the other modules that contain factories and controllers that you will use
]);

angular.module('shout.review', [
  //list the other modules that contain factories and controllers that you will use
  'shout.camera'
]);

angular.module('s3UploadApp', [
  'ngCookies',
  'ngSanitize',
  'angularFileUpload'
]);

angular.module('shout.settings', [
  's3UploadApp',
  'shout.camera',
  'shout.location',
  's3UploadApp',
  'shout.constants'
  // 'shout.login'
  //list the other modules that contain factories and controllers that you will use
]);

angular.module("shout.constants", [])

.constant("API_HOST", "https://34921346.ngrok.com")

;
angular
  .module('shout')
  .config(configure);

configure.$injector = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];

function configure($stateProvider, $urlRouterProvider, $compileProvider) {
  console.log('shout configure');
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  // Ionic uses AngularUI Router which uses the concept of states
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl as vm'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'app/login/signup.html',
    controller: 'SignupCtrl as vm'
  })

  .state('review', {
    url: '/review',
    templateUrl: 'app/review/tab-review.html',
    controller: 'ReviewCtrl as vm'
  })

  //setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/layout/tabs.html',
    controller: 'TabsCtrl as vm'
  })

  //Each tab has its own nav history stack:
  .state('tab.inbox', {
    url: '/inbox',
    views: {
      'tab-inbox': {
        templateUrl: 'app/inbox/tab-inbox.html',
        controller: 'InboxCtrl as vm'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'app/settings/tab-settings.html',
        controller: 'SettingsCtrl as vm'
      }
    }
  })

  /*
  .state('tab.camera', {
      url: '/camera',
      views: {
        'tab-camera': {
          templateUrl: 'app/camera/tab-camera.html',
          controller: 'CameraCtrl'
        }
      }
    })
    */
  .state('tab.album', {
    url: '/album',
    views: {
      'tab-album': {
        templateUrl: 'app/album/tab-album.html',
        controller: 'AlbumCtrl as vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}

angular
  .module('shout')
  .run(run);

run.$inject = ['$http', '$rootScope', 'API_HOST'];

function run($http, $rootScope, API_HOST) {
  console.log('shout run');
  ionic.Platform.ready(function() {
    console.log('ionic platform ready');

    $http.get(API_HOST+'/api/config').success(function(config) {
      $rootScope.config = config;
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}

/*
xml2json v 1.1
copyright 2005-2007 Thomas Frank

This program is free software under the terms of the 
GNU General Public License version 2 as published by the Free 
Software Foundation. It is distributed without any warranty.
*/

xml2json = {
  parser: function(xmlcode, ignoretags, debug) {
    if (!ignoretags) {
      ignoretags = "";
    }
    xmlcode = xmlcode.replace(/\s*\/>/g, '/>');
    xmlcode = xmlcode.replace(/<\?[^>]*>/g, "").replace(/<\![^>]*>/g, "");
    if (!ignoretags.sort) {
      ignoretags = ignoretags.split(",");
    }
    var x = this.no_fast_endings(xmlcode);
    x = this.attris_to_tags(x);
    x = escape(x);
    x = x.split("%3C").join("<").split("%3E").join(">").split("%3D").join("=").split("%22").join("\"");
    for (var i = 0; i < ignoretags.length; i++) {
      x = x.replace(new RegExp("<" + ignoretags[i] + ">", "g"), "*$**" + ignoretags[i] + "**$*");
      x = x.replace(new RegExp("</" + ignoretags[i] + ">", "g"), "*$***" + ignoretags[i] + "**$*")
    }
    x = '<JSONTAGWRAPPER>' + x + '</JSONTAGWRAPPER>';
    this.xmlobject = {};
    var y = this.xml_to_object(x).jsontagwrapper;
    if (debug) {
      y = this.show_json_structure(y, debug);
    }
    return y;
  },
  xml_to_object: function(xmlcode) {
    var x = xmlcode.replace(/<\//g, "§");
    x = x.split("<");
    var y = [];
    var level = 0;
    var opentags = [];
    for (var i = 1; i < x.length; i++) {
      var tagname = x[i].split(">")[0];
      opentags.push(tagname);
      level++;
      y.push(level + "<" + x[i].split("§")[0]);
      while (x[i].indexOf("§" + opentags[opentags.length - 1] + ">") >= 0) {
        level--;
        opentags.pop();
      }
    }
    var oldniva = -1;
    var objname = "this.xmlobject";
    for (i = 0; i < y.length; i++) {
      var preeval = "";
      var niva = y[i].split("<")[0];
      var tagnamn = y[i].split("<")[1].split(">")[0];
      tagnamn = tagnamn.toLowerCase();
      var rest = y[i].split(">")[1];
      if (niva <= oldniva) {
        var tabort = oldniva - niva + 1;
        for (var j = 0; j < tabort; j++) {
          objname = objname.substring(0, objname.lastIndexOf("."));
        }
      }
      objname += "." + tagnamn;
      var pobject = objname.substring(0, objname.lastIndexOf("."));
      if (eval("typeof " + pobject) != "object") {
        preeval += pobject + "={value:" + pobject + "};\n";
      }
      var objlast = objname.substring(objname.lastIndexOf(".") + 1);
      var already = false;
      for (var k in eval(pobject)) {
        if (k == objlast) {
          already = true
        }
      };
      var onlywhites = true;
      for (var s = 0; s < rest.length; s += 3) {
        if (rest.charAt(s) != "%") {
          onlywhites = false
        }
      };
      if (rest != "" && !onlywhites) {
        if (rest / 1 != rest) {
          rest = "'" + rest.replace(/\'/g, "\\'") + "'";
          rest = rest.replace(/\*\$\*\*\*/g, "</");
          rest = rest.replace(/\*\$\*\*/g, "<");
          rest = rest.replace(/\*\*\$\*/g, ">")
        }
      } else {
        rest = "{}"
      };
      if (rest.charAt(0) == "'") {
        rest = 'unescape(' + rest + ')'
      };
      if (already && !eval(objname + ".sort")) {
        preeval += objname + "=[" + objname + "];\n"
      };
      var before = "=";
      after = "";
      if (already) {
        before = ".push(";
        after = ")"
      };
      var toeval = preeval + objname + before + rest + after;
      eval(toeval);
      if (eval(objname + ".sort")) {
        objname += "[" + eval(objname + ".length-1") + "]"
      };
      oldniva = niva
    };
    return this.xmlobject
  },
  show_json_structure: function(obj, debug, l) {
    var x = '';
    if (obj.sort) {
      x += "[\n"
    } else {
      x += "{\n"
    };
    for (var i in obj) {
      if (!obj.sort) {
        x += i + ":"
      };
      if (typeof obj[i] == "object") {
        x += this.show_json_structure(obj[i], false, 1)
      } else {
        if (typeof obj[i] == "function") {
          var v = obj[i] + "";
          //v=v.replace(/\t/g,"");
          x += v
        } else if (typeof obj[i] != "string") {
          x += obj[i] + ",\n"
        } else {
          x += "'" + obj[i].replace(/\'/g, "\\'").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r") + "',\n"
        }
      }
    };
    if (obj.sort) {
      x += "],\n"
    } else {
      x += "},\n"
    };
    if (!l) {
      x = x.substring(0, x.lastIndexOf(","));
      x = x.replace(new RegExp(",\n}", "g"), "\n}");
      x = x.replace(new RegExp(",\n]", "g"), "\n]");
      var y = x.split("\n");
      x = "";
      var lvl = 0;
      for (var i = 0; i < y.length; i++) {
        if (y[i].indexOf("}") >= 0 || y[i].indexOf("]") >= 0) {
          lvl--
        };
        tabs = "";
        for (var j = 0; j < lvl; j++) {
          tabs += "\t"
        };
        x += tabs + y[i] + "\n";
        if (y[i].indexOf("{") >= 0 || y[i].indexOf("[") >= 0) {
          lvl++
        }
      };
      if (debug == "html") {
        x = x.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        x = x.replace(/\n/g, "<BR>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
      };
      if (debug == "compact") {
        x = x.replace(/\n/g, "").replace(/\t/g, "")
      }
    };
    return x
  },
  no_fast_endings: function(x) {
    x = x.split("/>");
    for (var i = 1; i < x.length; i++) {
      var t = x[i - 1].substring(x[i - 1].lastIndexOf("<") + 1).split(" ")[0];
      x[i] = "></" + t + ">" + x[i]
    };
    x = x.join("");
    return x
  },
  attris_to_tags: function(x) {
    var d = ' ="\''.split("");
    x = x.split(">");
    for (var i = 0; i < x.length; i++) {
      var temp = x[i].split("<");
      for (var r = 0; r < 4; r++) {
        temp[0] = temp[0].replace(new RegExp(d[r], "g"), "_jsonconvtemp" + r + "_")
      };
      if (temp[1]) {
        temp[1] = temp[1].replace(/'/g, '"');
        temp[1] = temp[1].split('"');
        for (var j = 1; j < temp[1].length; j += 2) {
          for (var r = 0; r < 4; r++) {
            temp[1][j] = temp[1][j].replace(new RegExp(d[r], "g"), "_jsonconvtemp" + r + "_")
          }
        };
        temp[1] = temp[1].join('"')
      };
      x[i] = temp.join("<")
    };
    x = x.join(">");
    x = x.replace(/ ([^=]*)=([^ |>]*)/g, "><$1>$2</$1");
    x = x.replace(/>"/g, ">").replace(/"</g, "<");
    for (var r = 0; r < 4; r++) {
      x = x.replace(new RegExp("_jsonconvtemp" + r + "_", "g"), d[r])
    };
    return x
  }
};


if (!Array.prototype.push) {
  Array.prototype.push = function(x) {
    this[this.length] = x;
    return true
  }
};

if (!Array.prototype.pop) {
  Array.prototype.pop = function() {
    var response = this[this.length - 1];
    this.length--;
    return response
  }
};

angular
  .module('shout.album')
  .controller('AlbumCtrl', AlbumCtrl);

AlbumCtrl.$inject = ['$state'];

function AlbumCtrl($state) {
  console.log('AlbumCtrl');
  var vm = this;

  vm.photos = [];
}

angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

function AlbumFactory() {
  console.log('AlbumFactory');
  var services = {};

  services.photos = [];
  services.savePhoto = savePhoto;

  return services;

  function savePhoto() {
  }

}

angular
  .module('shout.broadcast')
  .factory('BroadcastFactory', BroadcastFactory);

BroadcastFactory.$inject = ['LocationFactory', '$http', 'API_HOST'];

function BroadcastFactory(LocationFactory, $http, API_HOST) {
  var services = {};
    services.reBroadcast = reBroadcast;
    services.sendBroadcastEvent = sendBroadcastEvent;
  return services;

  function reBroadcast(photo) {
    console.log('currentPosition: ', LocationFactory.currentPosition);
    if (LocationFactory.currentPosition && LocationFactory.currentPosition.userId && 
        LocationFactory.currentPosition.x && LocationFactory.currentPosition.y) {
      photo = _.extend(photo, LocationFactory.currentPosition);
      photo.timestamp = new Date().getTime(); 
      console.log('reBroadcast this photo: ', photo);
      services.sendBroadcastEvent(photo);
    } else {
      console.log('sorry cant broadcast that photo');
    }
  }

  function sendBroadcastEvent (broadcastEvent) {
    $http.post(API_HOST + '/events/broadcast', broadcastEvent).success(function(){console.log('sent broadcast event to server!!!');});
  }
} 
angular
  .module('shout.camera')
  .controller('CameraCtrl', CameraCtrl);

CameraCtrl.$inject = ['$scope', '$state', '$location'];

function CameraCtrl($scope, $state, $location) {
  console.log('CameraCtrl');
}

angular
  .module('shout.camera')
  .factory('CameraFactory', CameraFactory);

CameraFactory.$inject = ['$state'];

function CameraFactory($state) {
  console.log('CameraFactory');
  var services = {};
  
  var uploadurl = "http://localhost/upl";
  var pictureSource;
  var destinationType; // sets the format of returned value
  var picture;
  initialize();

  services.query = query;
  services.takePicture = takePicture;
  services.getPicture = getPicture;

  return services;

  function initialize() {
    ionic.Platform.ready(function() {
      if (!navigator.camera) {
        // error handling
        console.log('no camera found');
        return;
      }
      //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
      pictureSource = navigator.camera.PictureSourceType.CAMERA;
      destinationType = navigator.camera.DestinationType.FILE_URI;
    });
  }

  function query() {
    console.log('query');
    return uploadurl;
  }

  function takePicture() {
    console.log('takePicture');
    var options = {
      quality: 50,
      destinationType: destinationType,
      sourceType: pictureSource,
      encodingType: 0
    };
    if (!navigator.camera) {
      // error handling
      console.log('no camera found');
      $state.go('review');
      return;
    }
    navigator.camera.getPicture(
      function(imageURI) {
        console.log('got camera success');
        picture = imageURI;
        $state.go('review');
      },
      function(err) {
        // error handling camera plugin
        console.log('got camera error ', err);
        $state.go('review');
      },
      options);
  }

  function getPicture() {
    return picture;
  }
}

angular
  .module('shout.inbox')
  .controller('InboxCtrl', InboxCtrl);

InboxCtrl.$inject = ['$scope', '$state', 'InboxFactory', 'AlbumFactory', 'CameraFactory', 'BroadcastFactory'];

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory, CameraFactory, BroadcastFactory) {
  console.log('InboxCtrl');
  var vm = this;
  var currentStart = 0;

  //when user clicks save on a photo call AlbumFactory.savePhoto();
  vm.photos = [];
  vm.newPhotos = [];
  vm.data = CameraFactory.data;
  vm.obj = CameraFactory.obj;
  vm.takePicture = CameraFactory.takePicture;
  vm.query = CameraFactory.query;
  vm.addPhotos = addPhotos;
  vm.doRefresh = doRefresh;
  vm.loadMore = loadMore;
  vm.reBroadcast = reBroadcast;
  vm.clearInbox = clearInbox;
  vm.morePhotosVar = false;
  vm.canScroll = false;

  vm.addPhotos(InboxFactory.photos);

  $scope.$on('updateInbox', function(event, data) {
    console.log('update inbox event heard!!!');
    newPhotos = InboxFactory.filterForNew(vm.photos, InboxFactory.photos);
    vm.clearInbox();
    vm.addPhotos(newPhotos);
  });

  function doRefresh() {
    console.log('doRefresh called');
    vm.clearInbox();
    $scope.$broadcast('scroll.refreshComplete');
  }

  function loadMore() {
    console.log('loadMore called');
    if (vm.morePhotosVar) {
      vm.canScroll = true;
    } else {
      vm.canScroll = false;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  function addPhotos(photos) {
    vm.photos = vm.photos.concat(photos);
    vm.morePhotosVar = true;
  }

  function clearInbox() {
    vm.photos = InboxFactory.removeExpired(vm.photos, InboxFactory.photos);

  }

  function reBroadcast(index) {
    if (InboxFactory.checkValidPhoto(vm.photos[index])) {
      BroadcastFactory.reBroadcast(vm.photos[index]);
    } else {
      console.log('that photo is expired, refresh your inbox!');
    }
  }

}

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

}


angular
  .module('shout.tabs')
  .controller('TabsCtrl', TabsCtrl);

TabsCtrl.$inject = ['CameraFactory'];

function TabsCtrl(CameraFactory){
  vm = this; 

  vm.takePicture = CameraFactory.takePicture; 

}  
angular
  .module('shout.localstorage')
  .factory('$localstorage', LocalStorageFactory);

LocalStorageFactory.$inject = ['$window'];

function LocalStorageFactory ($window) {
  var services = {};

  services.set = set; 
  services.get = get; 
  services.setObject = setObject; 
  services.getObject = getObject;

  return services; 

  function set(key, value) {
    $window.localStorage[key] = value;
  }

  function get(key, defaultValue) {
    return $window.localStorage[key] || defaultValue;
  }

  function setObject (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
  }

  function getObject(key) {
      return JSON.parse($window.localStorage[key] || '{}');
  }

}  
angular
  .module('shout.location')
  .factory('LocationFactory', LocationFactory);

LocationFactory.$inject = ['$ionicPlatform', '$http', 'InboxFactory', '$localstorage', 'API_HOST'];

function LocationFactory($ionicPlatform, $http, InboxFactory, $localstorage, API_HOST) {
  console.log('LocationFactory');
  var currentPosition, watchId, intervalId, userId;
  var services = {
    setPosition: setPosition,
    setWatch: setWatch,
    getCurrentPosition: getCurrentPosition,
    getSuccessCallback: getSuccessCallback,
    watchSuccessCallback: watchSuccessCallback,
    errorCallback: errorCallback,
    currentPosition: currentPosition,
    clearWatch: clearWatch, 
    triggerPingInterval: triggerPingInterval,
    clearPingInterval: clearPingInterval, 
    intervalId: intervalId
  };

  userId = $localstorage.get('userId');

  triggerPingInterval();

  return services;

  function getCurrentPosition (successCallback, errorCallback) {
    console.log('about to grab the initial position');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  function setWatch (successCallback, errorCallback) {
    console.log('setting watch on position');
    watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
  }

  function setPosition (position) {

    services.currentPosition = {
                      userId: $localstorage.get('userId'),
                      y: position.coords.latitude,
                      x: position.coords.longitude,
                      timestamp: new Date().getTime()
                      };
    console.log(' currentPosition set! ', services.currentPosition);

  }

  function sendPosition () {
    if (services.currentPosition && services.currentPosition.userId 
      && services.currentPosition.x && services.currentPosition.y){
      // $http.post(API_HOST + '/gps/position', currentPosition).success(InboxFactory.updateInbox(data.inbox));
      $http.post(API_HOST + '/gps/position', services.currentPosition).success(function(){console.log('sent position to server!!!');});
    } else {
      console.log('not sending incomplete position object to server');
    }
  }

  function errorCallback(error) {
    console.log('error getting position: ', error);
  }

  function getSuccessCallback (position) {
    setPosition(position);
    sendPosition();
  }

  function watchSuccessCallback (position) {
    setPosition(position);
  }

  function clearWatch () {
    navigator.geolocation.clearWatch(watchId);
  }

  function triggerPingInterval() {
    intervalId = setInterval(sendPosition, 60000);
  }

  function clearPingInterval() {
    console.log('clear ping interval called with id: ', intervalId);
    clearInterval(intervalId);
    intervalId = null; 
  }

}

angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$state', 'LoginFactory'];

function LoginCtrl($scope, $state, LoginFactory) {
  console.log('LoginCtrl');
  var vm = this;
  vm.data = null;
  vm.login = login;
  vm.badCombo = false;

  function login() {
    console.log('vm.data: ', vm.data);
    LoginFactory.loginUser(vm.data)
      .success(function(res) {
        console.log('res from server on login: ', res);
        LoginFactory.successfulLogin(res);
        $state.go('tab.inbox');
      })
      .error(function(res) {
        console.log('error on login');
        vm.badCombo = true;
      });
  }
}

angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['LocationFactory', 'InboxFactory', '$localstorage', '$http', 'API_HOST'];

function LoginFactory(LocationFactory, InboxFactory, $localstorage, $http, API_HOST) {
  return {
    successfulLogin: successfulLogin,
    loginUser: loginUser
  };

  function loginUser(data) {
    return $http({
      method: 'POST',
      url: API_HOST + '/users/signin',
      data: data
    });
  }

  function successfulLogin(data) {
    console.log('login factory successfulLogin called');
    $localstorage.set('userId', data.userId);
    // InboxFactory.updateInbox(data.inbox)
    LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
    LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback);
  }

}

angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state', 'SignupFactory'];

function SignupCtrl($state, SignupFactory) {
  console.log('SignupCtrl');
  var vm = this;
  vm.data = null;
  vm.badUsername = false;

  vm.signup = signup;

  function signup() {
    console.log('vm.data: ', vm.data);
    SignupFactory.signupUser(vm.data)
      .success(function(res) {
        console.log('response from server on singup: ', res);
        $state.go('login');
      })
      .error(function(res) {
        console.log('error on signup');
        vm.badUsername = true;
      });
  }

}

angular
  .module('shout.signup')
  .factory('SignupFactory', SignupFactory);

SignupFactory.$inject = ['$http', '$localstorage', 'API_HOST'];

function SignupFactory($http, $localstorage, API_HOST) {
  var services = {};
  services.signupUser = signupUser;

  return services;

  function signupUser(data) {
    console.log('signup data: ', data);
    return $http({
      method: 'POST',
      url: API_HOST + '/users/signup',
      data: data
    });
  }
}

angular
  .module('shout.review')
  .controller('ReviewCtrl', ReviewCtrl);

ReviewCtrl.$inject = ['$state', 'CameraFactory', 'ReviewFactory'];

function ReviewCtrl($state, CameraFactory, ReviewFactory) {
  console.log('ReviewCtrl');
  var vm = this;

  vm.photo = CameraFactory.getPicture();
  vm.sharePhoto = ReviewFactory.sharePhoto;
}

angular
  .module('shout.review')
  .factory('ReviewFactory', ReviewFactory);

ReviewFactory.$inject = ['$state'];

function ReviewFactory($state) {
  console.log('ReviewFactory');
  var services = {};

  services.photo = {};
  services.sharePhoto = sharePhoto;

  return services;

  function sharePhoto() {
    $state.go('tab.settings');
  }

}

//angular
//  .module('s3UploadApp')
//  .config(s3configure)
//  .run(s3run);
//
//function s3configure($locationProvider) {
//  $locationProvider.html5Mode(true);
//}
//
//function s3run($rootScope, $location, $http) {
//  $http.get('/api/config').success(function(config) {
//    $rootScope.config = config;
//  });
//}

angular
  .module('s3UploadApp')
  .factory('s3Upload', s3Upload);

s3Upload.$inject = ['$http', '$location', '$upload', '$rootScope', '$localstorage', 'API_HOST'];

function s3Upload($http, $location, $upload, $rootScope, $localstorage, API_HOST) {

  var imageUploads = [];
  var upload = [];
  var services = {};
  var files = [];

  services.uploadFile = uploadFile;

  return services;

  function abort(index) {
    upload[index].abort();
    upload[index] = null;
  }

  $scope.uploadFile = uploadFile;

  function uploadFile($files) {
    $files = [$files];
    files = $files;
    console.log(files);
    upload = [];
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      file.progress = parseInt(0);
      (function(file, i) {
        $http.get(API_HOST + '/api/s3Policy?mimeType=' + file.type).success(function(response) {
          var s3Params = response;
          $localstorage.set('timestamp', Date.now());
          var photoId = $localstorage.get('userId') + $localstorage.get('timestamp');
          upload[i] = $upload.upload({
            url: 'https://' + $rootScope.config.awsConfig.bucket + '.s3.amazonaws.com/',
            method: 'POST',
            transformRequest: function(data, headersGetter) {
              //Headers change here
              var headers = headersGetter();
              delete headers['Authorization'];
              return data;
            },
            data: {
              //'key': 's3Upload/' + Math.round(Math.random() * 10000) + '$$' + file.name,
              'key': 's3Upload/' + photoId + '.jpeg',
              'acl': 'public-read',
              'Content-Type': file.type,
              'AWSAccessKeyId': s3Params.AWSAccessKeyId,
              'success_action_status': '201',
              'Policy': s3Params.s3Policy,
              'Signature': s3Params.s3Signature
            },
            file: file,
          });
          console.log(file);
          upload[i]
            .then(function(response) {
              file.progress = parseInt(100);
              if (response.status === 201) {
                var data = xml2json.parser(response.data),
                  parsedData;
                parsedData = {
                  location: data.postresponse.location,
                  bucket: data.postresponse.bucket,
                  key: data.postresponse.key,
                  etag: data.postresponse.etag
                };
                imageUploads.push(parsedData);

              } else {
                alert('Upload Failed');
              }
            }, null, function(evt) {
              file.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        });
      }(file, i));
    }
    console.log('done with upload for loop');
  }
}

angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$http', '$state', '$ionicHistory', '$localstorage', 'CameraFactory', 'SettingsFactory', 'LocationFactory', 's3Upload', 'API_HOST'];

function SettingsCtrl($http, $state, $ionicHistory, $localstorage, CameraFactory, SettingsFactory, LocationFactory, s3Upload, API_HOST) {
  console.log('SettingsCtrl');

  var vm = this;

  vm.radius = 5; //initial value 5 miles
  vm.TTL = 5; //initial value 5 minutes
  vm.watch = true;
  vm.acceptSettings = acceptSettings;
  vm.userSetWatch = userSetWatch;
  vm.sharePhoto = sharePhoto;

  function acceptSettings() {
    SettingsFactory.setSettings(parseInt(vm.radius), parseInt(vm.TTL));
    if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $state.go('tab.inbox');
    }
    console.log('radius set to: ', parseInt(vm.radius));
    console.log('TTL set to: ', parseInt(vm.TTL));
  }

  function sharePhoto() {
    var files =  document.getElementById('photos').files[0];
    console.log(files);
    var filepath =  CameraFactory.getPicture(); 

    if(files) {
      s3Upload.uploadFile(files);
    } else {
      window.resolveLocalFileSystemURL(filepath, gotFile, fail);
    }

    var win = function (r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
    };

    var fail = function (error) {
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
      console.log(error);
    };

    function gotFile(file) {
      console.log(file);
      //s3Upload.uploadFile(file);

      $http.get(API_HOST + '/api/s3Policy?mimeType=' + 'image').success(function(response) {
        var s3Params = response;
        $localstorage.set('timestamp', Date.now());
        var photoId = $localstorage.get('userId') + $localstorage.get('timestamp');

        var options = new FileUploadOptions();
          options.fileKey = 'file';
          options.fileName = photoId+'.jpeg';
          options.mimeType = 'image/jpeg';
          options.chunkedMode = false;

        var params = { 
          'key': 's3Upload/' + photoId + '.jpeg',
          'acl': 'public-read',
          'Content-Type': 'image/jpeg',
          'AWSAccessKeyId': s3Params.AWSAccessKeyId,
          'success_action_status': '201',
          'Policy': s3Params.s3Policy,
          'Signature': s3Params.s3Signature
        };

        //var headers = {'Content-Length':file.size};

        console.log('headers');

        options.params = params;
        //options.headers = headers;

        var url = 'https://' + 'ripple-photos' + '.s3.amazonaws.com/';
        var ft = new FileTransfer();
        ft.upload(filepath, url, win, fail, options);

        //s3Upload.uploadFile([files]);
        console.log('sending new photo');
        var pos = LocationFactory.currentPosition;
        var data = {};
        data.x = pos.x;
        data.y = pos.y;
        data.userId = $locationstorage.get('userId');
        data.photoId = photoId;
        data.TTL = vm.TTL;
        data.radius = vm.radius;
        data.timestamp = $localstorage.get('timestamp');
        $http.post(API_HOST+'/photos/newPhoto', data);
      });
    }
  }

  function userSetWatch() {
    SettingsFactory.setWatch(vm.watch);
  }

}

angular
  .module('shout.settings')
  .factory('SettingsFactory', SettingsFactory);

SettingsFactory.$inject = ['LocationFactory'];

function SettingsFactory(LocationFactory) {
  var radius = 5,
      TTL = 5; //initial values 
  var services = {
    setSettings : setSettings,
    setWatch: setWatch,
    radius: radius,
    TTL: TTL
  };

  return services; 

  function setWatch(watch) {
    console.log('settings factory set watch called with watch: ', watch);
    if (!watch) {
      LocationFactory.clearWatch();
      LocationFactory.clearPingInterval(); 
    } else {
      LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
      LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback);
      LocationFactory.triggerPingInterval(); 
    }
  }

  function setSettings(userRadius, userTTL) {
    console.log('settings set in factory: ', TTL, radius);
    if (userRadius !== radius){
      radius = userRadius; 
    }
    if (userTTL !== TTL ){
      TTL = userTTL; 
    }
  }

}