var app = require('../app');
var should = require('should');
var supertest = require('supertest');
var userController = require('../Controllers/userController');
var User = require('../Models/User');

  describe('user controller', function(){

    it('should signup user if username does not exist', function(done){
      supertest(app)
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send('{"username": "newUser", "password": "1234"}')
      .end(function(err, res){
        res.status.should.equal(200);
        done();
      });
    });

    it('should reject if username already exists', function(done){
      supertest(app)
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send('{"username": "newUser", "password": "1234"}')
      .end(function(err, res){
        res.status.should.equal(500);
        done();
      });
    });

    it('should delete test user', function(done){
      User.remove({username: "newUser"}, function(err){
        if(err){
          console.log(err);
        } else { 
          User.findOne({username: "newUser"}, function(err, res){
            if(err){
              console.log(err);
            } else {
              console.log("this is the delete test", res);
              should(res).be.exactly(null);
              done();
            }
          });
        }
      });
    });
    

  });





