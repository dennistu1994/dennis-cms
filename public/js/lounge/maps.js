define(['lounge/resources', 'lounge/units'], function(Resources, Units){
  var Maps = {
    cache: {},
    test: (function(){
      var map = new Map('test', ['grassy_dirt64']);
      map.width = 1280;
      map.height = 720;
      map.init = function(){
        //background
        var background = new Units.GradientSprite(this.width, this.height, 0x3182d5, 0xc1cbd5);
        this.units.push(background);
        //ground
        var ground = new Units.Sprite(this.width, 64, Resources.grassy_dirt64.data, true, false, true);
        ground.mesh.position.y = - map.height/2 + 32;
        this.units.push(ground);

      }.bind(map);

      return map;
    })()
  };

  function Map(id, resource_ids){
    this.width = 0;
    this.height = 0;
    this.units=[];
    this.id=id;
    this.resource_ids = resource_ids;
    this.loaded = false;
    //init needs to be called after map is loaded
    this.init = null;
  }

  return Maps;
});
