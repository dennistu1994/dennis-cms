var Instance = require('./world/instance');
var SocketHelper = require('./world/socket_helper');

var Init = {};

Init.init_lounge = function(server){
  var lounge = new Instance();
  SocketHelper.init(server);
  SocketHelper.set_connection_listener(lounge.on_connection.bind(lounge));
  SocketHelper.set_disconnection_listener(lounge.on_disconnection.bind(lounge));
  SocketHelper.set_update_listener(lounge.on_update.bind(lounge));
  lounge.start();
};

module.exports = Init;
