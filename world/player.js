var Unit = require('./unit');
var SAT = require('sat');
function Player(){
  this.position = new SAT.Vector(0, 0);
}
Player.prototype = new Unit();
Player.prototype.constructor = Player;
module.exports = Player;
