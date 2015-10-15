var SocketHelper = require('./world/socket_helper');
var WorldHelper = require('./world/world_helper');
var Init = {};

Init.init_lounge = function(server){
  WorldHelper.load_maps(function(maps){
    //console.log(maps);
    var lounge = WorldHelper.make_instance(maps[0]);

    SocketHelper.init(server);

    SocketHelper.init_instance(lounge);
    // SocketHelper.set_connection_listener(lounge.on_connection.bind(lounge));
    // SocketHelper.set_disconnection_listener(lounge.on_disconnection.bind(lounge));
    // SocketHelper.set_update_listener(lounge.on_update.bind(lounge));

    lounge.start();
  });
};

module.exports = Init;
