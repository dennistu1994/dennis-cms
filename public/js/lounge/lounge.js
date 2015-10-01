$(function(){
  require([
    'socket.io',
    'lounge/maps',
    'lounge/loader',
    'lib/three_helper',
    'settings/resolutions',
    'lib/gameloop'
], function(
    io,
    Maps,
    Loader,
    ThreeHelper,
    Resolutions,
    Gameloop
  ){
    Loader.load_map(Maps.test, function(context){
      Maps.test.init();
      ThreeHelper.init_map(Resolutions['720p'], Maps.test);
      ThreeHelper.render();
      Gameloop.setGameLoop(Maps.test.update.bind(Maps.test), 20);
    });
  });
});
