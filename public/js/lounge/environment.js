define(['lounge/units'], function(Units){
  var Environment ={};
  function Cloud(width, height, image, altitude, map_width){
    Units.Sprite.call(this, width, height, image, false, false, true);
    this.dynamic = true;
    this.x_limit = map_width/2 + this.width/2;
    this.velocity.x = (Math.random()+3) * (Math.random()>0.5?1:-1) ;
    this.mesh.position.x = (Math.random() - 0.5) * map_width;
    console.log(this.mesh.anchor);
    this.mesh.position.y = altitude;
    this.update = function(delta){
      this.mesh.position.add(this.velocity.clone().multiplyScalar(delta));
      if(this.mesh.position.x > this.x_limit){
        this.mesh.position.x = -this.x_limit;
      } else if(this.mesh.position.x < -this.x_limit){
        this.mesh.position.x = this.x_limit;
      }
    };
  }

  Cloud.prototype = Object.create(Units.Sprite.prototype);
  Cloud.prototype.constructor = Cloud;

  Environment.Cloud = Cloud;
  return Environment;
});
