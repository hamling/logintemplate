var express = require('express');
//var bodyParser = require('body-parser');

var app = express();

// middleware
app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended:true}));

app.post('/register.html', function(req, res) {
  res.send("got a post to register.html");
});

app.post('/login.html', function(req, res) {
  res.send("got a post to login.html");
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
