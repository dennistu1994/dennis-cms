var Server = require('socket.io');

var SocketHelper = {
  server: null,
  instances: {},
};

function InstanceContainer(instance){
  this.instance = instance;
  this.server = null;
}

SocketHelper.init = function(http_server){
  SocketHelper.server = new Server(http_server);
};

SocketHelper.init_instance = function(instance){
  if(SocketHelper.instances[instance.id]){
    console.log("instance "+isntance.id+" already initiailzed");
    return;
  } else {
    var container = new InstanceContainer(instance);
    container.callbacks = instance.callbacks;
    instance.server = container.server = SocketHelper.server.of(instance.id);
    container.server.on('connection', function(socket){
      instance.on_connection(socket);
      container.server.on('disconnect', function(socket){
        instance.on_disconnect(socket);
      });
      container.server.on('u', function(data){
        instance.on_update(socket.id, data);
      }.bind(SocketHelper));
    });
  }
};
module.exports = SocketHelper;
