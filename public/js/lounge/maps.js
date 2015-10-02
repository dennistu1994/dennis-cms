define(['lounge/resources', 'lounge/units/units', 'lounge/units/environment', 'lounge/units/sprite_animation'], function(Resources, Units, Environment, SpriteAnimation){
  var Maps = {
    cache: {},
    test: (function(){
      var map = new Map('test', ['grassy_dirt64', 'cloud0_256', 'ss_1_16']);
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

        var cloud = new Environment.Cloud(256, 256, Resources.cloud0_256.data, 250, this.width);
        this.units.push(cloud);

        var ss_1_16 = new SpriteAnimation(Resources.ss_1_16);
        this.units.push(ss_1_16);
        ss_1_16.set_frame(7);
        ss_1_16.add_animation('all', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        ss_1_16.play_animation('all', 2, 0, true);
      }.bind(map);

      return map;
    })()
  };

  function Map(id, resource_ids){
    this.width = 0;
    this.height = 0;
    this.units=[];

    //=========temp variables=========
    this.t_num_units = 0;
    //=========temp variables=========

    this.id=id;
    this.resource_ids = resource_ids;
    this.loaded = false;
    //init needs to be called after map is loaded
    this.init = null;
  }

  Map.prototype.update = function(delta){
    this.t_num_units = this.units.length;
    for(var i = 0;i<this.t_num_units;i++){
      this.units[i].update(delta);
    }
  }

  return Maps;
});
