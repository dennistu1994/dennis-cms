var gameloop = require('node-gameloop');
var Map = require('./map');
var PlayerHelper = require('./player_helper');
var fps = 1;
var Config = require('./config')(fps);
var SocketHelper = require('./socket_helper');

function Instance(map){
  this.map = map || new Map();
  this.loop_handle = null;
};

function Client(socket){
  this.socket = socket;
  this.player = null;
};

Instance.prototype.update = function(){
  this.map.update();
  SocketHelper.emit();
};

Instance.prototype.on_connection = function(socket){
  var client = new Client(socket);
  client.player = PlayerHelper.get_player(client);
  this.map.add_client(client);
  console.log('client '+socket.id+' connected, total '+this.map.num_clients+' clients');
};

Instance.prototype.on_disconnection = function(socket){
  this.map.remove_client(socket.id);
  console.log('client disconnected, total '+this.map.num_clients+' clients');
};

Instance.prototype.on_update = function(from, data){
  console.log(from, data);
};

Instance.prototype.on_server_update = function(){

};

Instance.prototype.start = function(){
  this.loop_handle = gameloop.setGameLoop(this.update.bind(this), Config.interval);
};

module.exports = Instance;
