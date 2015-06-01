angular
  .module('s3Upload')
  .factory('s3', s3);

s3.$inject = ['$http', 'API_HOST'];

function s3($http, API_HOST) {

  var userId = 'userId';
  var url = 'https://' + 'ripple-photos' + '.s3.amazonaws.com/';
  var file = new File(); 

  var services = {};
  services.upload = upload;
  services.userId = userId;

  return services;

  function upload(newfile, callback) {
    file = newfile;
    console.log('uploadToS3');

    getSignedPolicy(function(response) {
      sendFile(response, function(){
        callback();
      });
    });
  }

  function getSignedPolicy(callback) {
    console.log('getSignedPolicy');
    $http.get(API_HOST + '/api/s3Policy?mimeType=' + file.type)
      .success(function(response) {
        callback(response);
      });
  }

  function sendFile(s3Params, callback) {
    console.log('sendFile');
    var extension = file.type.match(/\w+$/)[0];
    var params = {
      'key': 's3Upload/' + file.name + '.' + extension,
      'acl': 'public-read',
      'Content-Type': file.type,
      'AWSAccessKeyId': s3Params.AWSAccessKeyId,
      'success_action_status': '201',
      'Policy': s3Params.s3Policy,
      'Signature': s3Params.s3Signature
     };

    var options = new FileUploadOptions();
    options.fileKey = 'file';
    options.fileName = file.name + '.' + extension;
    options.mimeType = file.type;
    options.chunkedMode = false;
    options.params = params;
    console.log(options);
    var ft = new FileTransfer();
    ft.upload(file.localURL, url, callback, fail, options);
  }

  // Helper Functions
  function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
  }

  function fail(error) {
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    console.log(error);
  }

}
