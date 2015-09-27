var gameloop = require('node-gameloop');
var fps = 1;
var Config = require('./config_60fps')(fps);

function Instance(){
  this.clients = [];
  this.map = null;
  this.loop_handle = null;
};

function Client(socket){
  this.socket = socket;
  this.player = null;
}

Instance.prototype.add_client = function(client){
  this.clients.push(client);
  client.player = get_player(client)
  this.map.add_player(client.player);
}

Instance.prototype.update = function(){
  this.map.update();
};

Instance.prototype.on_connection = function(socket){
  this.add_client(new Client(socket));
}

Instance.prototype.start = function(){
  this.loop_handle = gameloop.setGameLoop(this.update.bind(this), Config.interval);
}

module.exports = Instance;
