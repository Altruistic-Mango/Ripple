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
