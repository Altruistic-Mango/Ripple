var app = require('../app');
var supertest = require('supertest');
var should = require('should');
var photoController = require('../Controllers/photoController');
var Photo = require('../Models/Photo');
var User = require('../Models/User');

describe('Photo Controller', function(){

  it('s3 docsign function should return signed policyDoc when given valid userId and timeStamp', function(done){
    // User.
    supertest(app)
    .post('/photos/signPolicyDoc')
    .set('Content-Type', 'application/json')
    .send('{"userId": "1234567", "timeStamp": "1234567890123"}')
    .end(function(err, res){
      console.log(res.body);
      should(res.body.bucket).be.exactly("ripple-photos");
      should(res.body.awsKey).be.exactly("AKIAIE5AVGKPA4OCKD5A");
      res.status.should.equal(200);
      done();

    });
  });
});

