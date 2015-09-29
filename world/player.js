var Unit = require('./unit');
function Player(){

}
Player.prototype = new Unit();
Player.prototype.constructor = Player;
module.exports = Player;
