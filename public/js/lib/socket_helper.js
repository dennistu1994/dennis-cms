define(['socket.io'], function(io){
  var SocketHelper = {
    conn: null
  };

  SocketHelper.bind_client_unit = function(unit){
    SocketHelper.client_unit = unit;
  };

  SocketHelper.init = function(map_id){
    SocketHelper.conn = io(window.location.host+map_id);
  };

  SocketHelper.send_input_state = function(){
    SocketHelper.conn.emit('u', 'test');
    //SocketHelper.conn.emit('u', SocketHelper.get_input_state());
  };

  SocketHelper.connect = function(map){
    SocketHelper.conn.emit('connect_map', map.id);
  };

  return SocketHelper;
});
