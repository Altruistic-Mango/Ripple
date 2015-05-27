var mocha = require("mocha");


function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}


describe("tests", function () {

  importTest("userTests", './userTests.js');

  importTest("photoTests", './photoTests');

});