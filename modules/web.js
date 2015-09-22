var Module = require('./module');

function Web(){
}

Web.prototype = new Module("web");
Web.prototype.constructor = Web;

Web.prototype.serve = function(req, res){
  res.write("this is module '"+this.path+"', serving request url '"+req.url+"'");
  res.end();
}

module.exports = new Web();
