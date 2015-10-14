var Player = require('./player');

var PlayerHelper = {};

PlayerHelper.get_player = function(client){
  //make default player
  return  new Player();
};

module.exports = PlayerHelper;
