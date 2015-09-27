function Map(){
  this.players = [];
  this.bounds = {width: 300, height: 300}
}

Map.prototype.update = function(){
  console.log("map update");
};
