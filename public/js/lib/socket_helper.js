define(['socket.io'], function(io){
  var SocketHelper = {
    conn: null
  };

  SocketHelper.bind_client_unit = function(unit){
    SocketHelper.client_unit = unit;
  };

  SocketHelper.init = function(){
    SocketHelper.conn = io();
    console.log(SocketHelper.conn);
  };

  SocketHelper.send_input_state = function(){
    SocketHelper.conn.emit('u', SocketHelper.get_input_state());
  };

  return SocketHelper;
});
