var crypto = require('crypto');
var bucket = "ripple-photos";
var s3Keys = require('./s3config');


var s3 = {

  // signs the policy document 
  // expiration set to 1 minute
	docSign: function(userId, timeStamp) {

    var photoId = userId + timeStamp;

		var expiration = new Date(new Date().getTime() + 1000 * 60 * 1).toISOString();

		var policy =
		{ "expiration": expiration,
		"conditions": [
		{"bucket": bucket},
		{"key": photoId},
		{"acl": 'public-read'},
		["starts-with", "$Content-Type", ""],
		["content-length-range", 0, 5242880]
		]};

		policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');

		signature = crypto.createHmac('sha1', s3Keys.secret).update(policyBase64).digest('base64');

	 var signedPolicy = {bucket: bucket, awsKey: s3Keys.awsKey, policy: policyBase64, signature: signature};

   return signedPolicy;

	}
}

module.exports = s3;