

var request = require('superagent');
var expect = require('expect.js');





describe('Suite one', function(){
  it(function(done){
    request.post('localhost:3000').end(function(res){

    	// expect(res).to.exist;
      // expect(res.status).to.equal(200);
      expect(res.statusCode).to.equal(200);
      done();

    });
  });

});



// describe('Suite two', function(){
//   it(function(done){

  
//   });
// });
