$(function(){
  require([
    'socket.io',
    'lounge/maps',
    'lounge/loader',
    'lib/three_helper',
    'settings/resolutions',
    'lib/gameloop',
    'lib/socket_helper'
], function(
    io,
    Maps,
    Loader,
    ThreeHelper,
    Resolutions,
    Gameloop,
    SocketHelper
  ){
    //connect
    Loader.load_maps(function(data){
      var map_json = data[0];
      var map = Maps.make_map(map_json);
      Loader.load_basic(function(){
        Loader.load_map(map, function(){
          map.init();

          //connect to server
          SocketHelper.init(map.id);

          ThreeHelper.init_map(Resolutions['720p'], map);
          ThreeHelper.render();
          Gameloop.setGameLoop(map.update.bind(map), 20);
        });
      });
    });
  });
});
