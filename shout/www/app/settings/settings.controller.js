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
        data.userId = pos.UserId;
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
