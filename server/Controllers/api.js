var config = require('../lib/config/aws.json');

// This function will provide the client with a temporary token used to upload photos to an Amazon S3 bucket.
exports.getClientConfig = function(req, res, next) {
  console.log('GET Client Config');
  return res.json(200, {
    awsConfig: {
      bucket: config.bucket
    }
  });
};
