var Player = require('./player');
var WorldHelper = {};
WorldHelper.get_player = function(client){
  //make default player
  return  new Player();
}
module.exports=WorldHelper;
