var Module = require('./module');

function Test(){
}

Test.prototype = new Module("test");
Test.prototype.constructor = Test;

Test.prototype.serve = function(req, res){
  res.write("this is module '"+this.path+"', serving request url '"+req.url+"'");
  res.end();
}

module.exports = new Test();
