define(['lounge/resources', 'lounge/units/units', 'lounge/units/environment', 'lounge/units/sprite_animation', 'sat', 'lib/socket_helper'], function(Resources, Units, Environment, SpriteAnimation, SAT, SocketHelper){
  var Maps = {
    cache: {},
    test: (function(){
      var map = new Map('test', ['grassy_dirt64', 'cloud0_256', 'ss_bandit_0', 'ss_1_16']);
      map.width = 1280;
      map.height = 720;
      map.init = function(){
        this.sync_counter= 0;
        //background
        var background = new Units.GradientSprite(this.width, this.height, 0x3182d5, 0xc1cbd5);
        this.units.push(background);
        //ground
        var ground = new Units.Sprite(this.width, 64, Resources.grassy_dirt64.data, true, false, true);
        ground.set_collider(new SAT.Box(new SAT.Vector(ground.mesh.position.x - ground.half_width, ground.mesh.position.y-ground.half_height), ground.width, ground.half_height).toPolygon(), ground.half_width, ground.half_height);
        ground.set_position(0, -map.height/2 + 32);
        this.units.push(ground);
        this.ground = ground;

        var cloud = new Environment.Cloud(256, 256, Resources.cloud0_256.data, 250, this.width);
        this.units.push(cloud);

        var ss_1_16 = new SpriteAnimation(Resources.ss_1_16, true);
        this.units.push(ss_1_16);
        ss_1_16.set_position(100, 100);
        ss_1_16.set_frame(0);
        ss_1_16.add_animation('all', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        ss_1_16.play_animation('all', 2, 0, true);
        this.b1 = ss_1_16;

        var ss_1_162 = new SpriteAnimation(Resources.ss_1_16, true);
        this.units.push(ss_1_162);
        ss_1_162.set_position(0, -312);
        ss_1_162.set_frame(0);
        ss_1_162.add_animation('all', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        ss_1_162.play_animation('all', 2, 4, true);
        this.b2 = ss_1_162;

        var bandit = new SpriteAnimation(Resources.ss_bandit_0);
        bandit.set_collider(new SAT.Box(new SAT.Vector(bandit.mesh.position.x - 14, bandit.mesh.position.y - 31), 30, 53).toPolygon(), 14, 31);
        this.units.push(bandit);
        bandit.add_animation('idle', [0, 1, 2, 3, 2, 1]);
        bandit.play_animation('idle', 8, 0, true);
        bandit.set_position(0, 52);
        SocketHelper.bind_client_unit(bandit);
        this.bandit = bandit;
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
    if(this.sync_counter === 0){
      //sync
      SocketHelper.send_player_state();
    }
    this.sync_counter = (this.sync_counter+1)%40;
    //console.log(SAT.testPolygonPolygon(this.ground.collider, this.b2.collider));
  }

  return Maps;
});
