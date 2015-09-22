var Module = require('./module');

function Index(){
  this.path = "/index";
  this.serve_static = false;
}

Index.prototype = new Module("index");
Index.prototype.constructor = Index;

Index.prototype.serve = function(req, res){
  if(this.serve_static){
    res.writeHead(302, {
      'Location': this.path+'.html'
    });
    res.end();
  } else {
    res.write("this is module '"+this.path+"', serving request url '"+req.url+"'");
    res.end();
  }
}

module.exports = new Index();
