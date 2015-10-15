define(['lounge/resources', 'lounge/units/units', 'lounge/units/environment', 'lounge/units/sprite_animation', 'sat', 'lib/socket_helper'], function(Resources, Units, Environment, SpriteAnimation, SAT, SocketHelper){
  var Maps = {
    cache: {}
  };

  Maps.make_map = function(json){
    var map = new Map(json.id, json.r);
    map.width = json.w;
    map.height = json.h;
    //init is called after map is loaded
    map.init = function(){
      //background
      if(json.e.bg.t === "GradientSprite"){
        var background = new Units.GradientSprite(map.width, map.height, parseInt(json.e.bg.ca), parseInt(json.e.bg.cb));
        map.units.push(background);
      }

      //ground
      json.e.g.forEach(function(g){
        var ground = new Units.Sprite(g.w, g.h, Resources[g.r].data, true, false, true);
        var collider_points = [];
        for(var i = 0;i<g.c.p.length;i+=2){
          collider_points.push(new SAT.Vector(g.c.p[i], g.c.p[i+1]));
        }
        ground.set_collider(new SAT.Polygon(new SAT.Vector(g.c.x, g.c.y), collider_points));
        ground.set_position(g.x, g.y);
        map.units.push(ground);
      });

      json.e.m.forEach(function(m){
        if(m.t === "Cloud"){
          var cloud = new Environment.Cloud(m.w, m.h, Resources[m.r].data, m.a, map.width);
          map.units.push(cloud);
        }
      });
    };

    return map;
  };

  function Map(id, resource_ids){
    this.width = 0;
    this.height = 0;
    this.units=[];
    this.sync_counter = 0;

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
      console.log('sent input state');
      SocketHelper.send_input_state();
    }
    this.sync_counter = (this.sync_counter+1)%2;
    //console.log(SAT.testPolygonPolygon(this.ground.collider, this.b2.collider));
  }

  return Maps;
});
