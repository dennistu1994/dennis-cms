function Map(width, height){
  this.clients = [];
  this.bounds = {width: width, height: height};
  this.num_clients = 0;
  this.grounds = [];
}

Map.prototype.update = function(){

};

Map.prototype.add_client = function(client){
  this.clients[client.socket.id] = client;
  this.num_clients++;
};

Map.prototype.remove_client = function(id){
  this.clients[id] = null;
  this.num_clients--;
};

module.exports = Map;
