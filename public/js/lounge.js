$(function(){
  require([
    'socket.io',
    'lounge/maps',
    'lounge/loader',
    'lounge/resources',
    'lib/three_helper',
    'settings/resolutions',
    'lounge/units'], function(
    io,
    Maps,
    Loader,
    Resources,
    ThreeHelper,
    Resolutions,
    Units
  ){
    Loader.load_map(Maps.test, function(context){
      Maps.test.units.push(new Units.Sprite(1920, 1080, Resources.test64));
      ThreeHelper.init_map(Resolutions['720p'], Maps.test);
      ThreeHelper.render();
    });
  });
});
