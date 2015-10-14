var Instance = require('./instance');
var Map = require('./map');
var fs = require('fs');
var SAT = require('sat');

var WorldHelper = {};

WorldHelper.load_maps = function(callback){
  fs.readFile('./public/shared/maps.json', 'utf8', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      var obj = JSON.parse(data);
      callback(obj);
    }
  });
};

WorldHelper.make_instance = function(json){
  var map = new Map(json.w, json.h);
  json.e.g.forEach(function(g){
    var collider_points = [];
    for(var i = 0;i<g.c.p.length;i+=2){
      collider_points.push(new SAT.Vector(g.c.p[i], g.c.p[i+1]));
    }
    var ground = new SAT.Polygon(new SAT.Vector(g.c.x, g.c.y), collider_points);
    console.log(ground);
    map.grounds.push(ground);
  });
  return new Instance(map);
};

module.exports=WorldHelper;
