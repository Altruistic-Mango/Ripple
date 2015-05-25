var app = require('../app');
var should = require('should');
var supertest = require('supertest');

describe('photos', function(){

	it('Test should return a 200 status code', function(done){
		supertest(app)
		.get('/photos/test')
		.expect(200)
		.end(function(err, res){
			res.status.should.equal(200);
			done();
		});
	});
 
  it('should successfully store a photo to the database', function(done){

  	supertest(app)
  	.post('/photos/newPhoto')
  	.set('Content-Type', 'application/json')
  	.send('{ "photoId": "1234", "radius": "12", "TTL": "12", "photoURL": "www.neat.com", "recipientList": "[]"}')
  	.end(function(err, res){
  		res.status.should.equal(200);
  		done();
  	});

  });
});




