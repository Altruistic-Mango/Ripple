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

  // userController.deleteUser('newUser');

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

// describe('photos', function(){

// 	it('Test should return a 200 status code', function(done){
// 		supertest(app)
// 		.get('/photos/test')
// 		.expect(200)
// 		.end(function(err, res){
// 			res.status.should.equal(200);
// 			done();
// 		});
// 	});
 
//   it('should successfully store a photo to the database', function(done){

//   	supertest(app)
//   	.post('/photos/newPhoto')
//   	.set('Content-Type', 'application/json')
//   	.send('{ "photoId": "1234", "radius": "12", "TTL": "12", "photoURL": "www.neat.com", "recipientList": "[]"}')
//   	.end(function(err, res){
//   		res.status.should.equal(200);
//   		done();
//   	});
//   });
// });


