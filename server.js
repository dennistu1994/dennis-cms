var express = require('express');
var app = express();
app.use(express.static('public'));
var port = process.env.PORT || 8000;
var server = app.listen(port, function () {
  console.log("server info:");
  console.log(server.address());
});
