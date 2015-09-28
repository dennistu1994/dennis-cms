var Index = require('./modules/index');
var Test = require('./modules/test')
var Instance = require('./world/instance');
var SocketHelper = require('./world/socket_helper');

var Init = {};

Init.init_modules = function(){
  Index.serve_static = true;
  Index.register_module(Test);
  return Index;
}

Init.init_lounge = function(server){
  var lounge = new Instance();
  SocketHelper.init(server);
  SocketHelper.set_connection_listener(lounge.on_connection.bind(lounge));
  SocketHelper.set_disconnection_listener(lounge.on_disconnection.bind(lounge));
  lounge.start();
}

module.exports = Init;
