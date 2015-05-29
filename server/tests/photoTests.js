var app = require('../app');
var supertest = require('supertest');
var should = require('should');
var photoController = require('../Controllers/photoController');
var Photo = require('../Models/Photo');
var User = require('../Models/User');

describe('Photo Controller', function() {

  it('s3 docsign function should return signed policyDoc when given valid userId and timeStamp', function(done) {
    User.create({
      username: "newUser",
      password: "1234",
      userId: "1234567"
    });
    supertest(app)
      .post('/photos/signPolicyDoc')
      .set('Content-Type', 'application/json')
      .send('{"userId": "1234567", "timeStamp": "1234567890123"}')
      .end(function(err, res) {
        should(res.body.bucket).be.exactly("ripple-photos");
        should(res.body.awsKey).be.exactly("AKIAIE5AVGKPA4OCKD5A");
        res.status.should.equal(200);
        User.remove({
          username: "newUser"
        }, function(err) {
          if (err) {
            console.log(err);
          }
        });
        done();

      });
  });

  it('s3 docsign function should not send signed doc policy if user is not recognized', function(done) {
    supertest(app)
      .post('/photos/signPolicyDoc')
      .set('Content-Type', 'application/json')
      .send('{"userId": "1234567", "timeStamp": "1234567890123"}')
      .end(function(err, res) {
        res.status.should.equal(400);
        done();
      });
  });

});
