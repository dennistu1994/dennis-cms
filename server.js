var http = require('http');
var path = require('path');
var log = require('./utils/log');
var util = require('util');
var fs = require('fs');

var Init = require('./init');
var Index = Init.init_modules();

var server = http.createServer(function(req, res) {
  //log(JSON.stringify(util.inspect(req)), "logs/req_" + Date.now() + ".json");
  var url = req.url;
  var req_url = req.url;
  console.log(req.url);
  if(req_url.indexOf("/index") !== 0){
    req_url = "/index" + req_url;
  }
  try {
    var fstats = fs.lstatSync('public'+url);
    if(fstats.isFile()){
      //file exists, serve it
      serve_file(url, res);
    } else {
      Index.route(req, res, req_url);
    }
  } catch (e){
    Index.route(req, res, req_url);
  }
});

server.listen(process.env.PORT || 8000, function(){
  console.log('listening port',process.env.PORT || 8000);
});

function serve_file(url, res){
  var extname = path.extname(url);
  var contentType;
  switch (extname) {
    case '.ico':
      contentType = "image/x-icon";
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
    default:
      contentType = 'text/html';
  }
  res.writeHead(200, { 'Content-Type': contentType });
  fs.readFile('public'+url, function(error, content) {
    if (error) {
      res.status(500).end();
    }
    else {
        res.end(content, 'utf-8');
    }
  });
}
