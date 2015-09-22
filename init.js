var Index = require('./modules/index');
var Test = require('./modules/test')

var Init = {};

Init.init_modules = function(){
  Index.serve_static = true;
  Index.register_module(Test);
  return Index;
}

module.exports = Init;
