var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var User = mongoose.model('User', new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true},
  password: String,
}));


var app = express();

// connect to mongo database
mongoose.connect('mongodb://localhost/myauth');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true}));

app.get('/', function(req, res) {
  res.send("Hello world");
});

app.post('/register.html', function(req, res) {
  // res.json(req.body);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save(function(err) {
    if (err) {
      var error = 'Something Bad Happened!  Error code: ' + err.code;
      if (err.code === 11000) {
        error = 'That email is already taken (not unique)';
      }
      res.send(error);
    }
    else {
      res.send("Registration successful!");
    }
  });

});

app.get('/logout', function(req, res) {
  res.redirect('/');
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
