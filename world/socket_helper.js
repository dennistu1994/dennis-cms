var Server = require('socket.io');

var SocketHelper = {
  server: null,
  callbacks: {
    connection: null,
    disconnect: null,
    update: null
  }
};

SocketHelper.init = function(http_server){
  SocketHelper.server = new Server(http_server);
  SocketHelper.server.on('connection', function(socket){
    SocketHelper.callbacks.connection(socket);
    socket.on('disconnect', function(socket){
      this.callbacks.disconnect(socket);
    }.bind(SocketHelper));
    socket.on('u', function(data){
      this.callbacks.update(socket.id, data);
    }.bind(SocketHelper));
  });
};

SocketHelper.set_connection_listener = function(callback){
  this.callbacks.connection = callback;
};

SocketHelper.set_disconnection_listener = function(callback){
  this.callbacks.disconnect = callback;
};

SocketHelper.set_update_listener = function(callback){
  this.callbacks.update = callback;
};

module.exports = SocketHelper;
