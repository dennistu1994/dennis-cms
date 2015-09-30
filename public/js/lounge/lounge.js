$(function(){
  require([
    'socket.io',
    'lounge/maps',
    'lounge/loader',
    'lib/three_helper',
    'settings/resolutions'
], function(
    io,
    Maps,
    Loader,
    ThreeHelper,
    Resolutions
  ){
    Loader.load_map(Maps.test, function(context){
      Maps.test.init();
      ThreeHelper.init_map(Resolutions['720p'], Maps.test);
      ThreeHelper.render();
    });
  });
});
