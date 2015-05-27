var crypto = require('crypto');
var s3Keys = require('./s3config');
var User = require('../Models/User');

var bucket = "ripple-photos";

var s3 = {

  // signs the policy document 
  // expiration set to 1 minute
  docSign: function(req, res) {


    var userId = req.body.userId;
    var timeStamp = req.body.timeStamp;

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

    User.findOne({userId: req.body.userId}, function(err, person){
      if(person === null){
        console.log("couldn't find user");
        res.send("cannot find user, unable to sign policy doc");
      } else {
        console.log("sending the signed doc");
        res.send(signedPolicy);
      }
    });
	}
}

module.exports = s3;