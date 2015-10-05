define(['socket.io'], function(io){
  var SocketHelper = {
    client_unit: null,
    conn: null
  };

  SocketHelper.bind_client_unit = function(unit){
    SocketHelper.client_unit = unit;
  };

  SocketHelper.init = function(){
    SocketHelper.conn = io();
    console.log(SocketHelper.conn);
  };

  SocketHelper.send_player_state = function(){
    SocketHelper.conn.emit('u', SocketHelper.client_unit.get_state());
  };

  return SocketHelper;
});
