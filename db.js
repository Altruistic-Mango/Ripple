var mongoose = require('mongoose');

mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/shoutr';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
 console.log('Mongodb connection open');
});

module.exports = db;
