define(function(){
  var Gameloop = {
    staticLoopId: 0,
    activeLoops: []
  }

  Gameloop.getLoopId = function(){
  	return Gameloop.staticLoopId++;
  };

  Gameloop.setGameLoop = function(update, tickLengthMs) {
  	var loopId = Gameloop.getLoopId();
  	Gameloop.activeLoops.push(loopId);
  	tickLengthMs = tickLengthMs || 1000 / 30;
  	var previousTick = Date.now();
  	var actualTicks = 0;
  	var gameLoop = function() {
  		var now = Date.now();
  		actualTicks++;
  		if (previousTick + tickLengthMs <= now) {
  			var delta = (now - previousTick) / 1000;
  			previousTick = now;
  			update(delta);
  			actualTicks = 0;
  		}
  		if (Gameloop.activeLoops.indexOf(loopId) === -1) {
  			return;
  		}
  		if (Date.now() - previousTick < tickLengthMs - 16) {
  			setTimeout(gameLoop, 16);
  		} else {
  			requestAnimationFrame(gameLoop);
  		}
  	}
  	gameLoop();
  	return loopId;
  };

  Gameloop.clearGameLoop = function(loopId) {
  	// remove the loop id from the active loops
  	Gameloop.activeLoops.splice(Gameloop.activeLoops.indexOf(loopId), 1);
  };

  return Gameloop;
});
