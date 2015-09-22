function Module(name){
  this.name = name;
  this.path = "/";
}

Module.prototype.register_module = function(module){
  module.path = this.path+"/"+module.name;
  this[module.name] = module;
  module.parent = this;
}

Module.prototype.match_url = function(url){
  return (this.path === url) || ((this.path + '/') === url);
}

Module.prototype.serve = function(req, res){
  this.not_implemented(res);
}

Module.prototype.not_implemented = function(res){
  res.write("not implemented");
  res.end();
}

Module.prototype.route = function(req, res, req_url){
  if(this.match_url(req_url)){
    this.serve(req, res);
  } else {
    var sub_url = req_url.replace(this.path+'/', "").split("/")[0];
    if(this[sub_url] && this[sub_url].route){
      this[sub_url].route(req, res, req_url);
    } else {
      this.not_implemented(res);
    }
  }
}

module.exports = Module;
