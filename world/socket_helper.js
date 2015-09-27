var io = require('socket.io')(process.env.PORT || 8000);

var SocketHelper = {
  sockets: [],
  callbacks: {
    connection: null
  }
};

SocketHelper.init = function(){
  io.on('connection', function(socket){
    SocketHelper.sockets.push(socket);
    this.callbacks.connection(socket);
  });
};

SocketHelper.set_connection_listener = function(callback){
  this.callbacks.connection = callback;
};

module.exports = SocketHelper;
