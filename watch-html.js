var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/theme/')));

// app.get('/', function(req, res){
//   res.send('hello world');
// });

app.listen(8080);