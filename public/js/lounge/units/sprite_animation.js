define(['lounge/units/units'], function(Units){
  function Animation(frames){
      this.frames = frames;
      this.current_i = 0;
      this.animation_length = this.frames.length;
      this.elapsed = 0;
      this.repeat = true;
      this.playing = false;
  }

  Animation.prototype.update = function(delta){
    if(!this.playing){
      return;
    }

    this.elapsed += delta;
    if(this.elapsed > delta){
      this.current_i += Math.floor(this.elapsed/this.interval);
      if(this.current_i >= this.animation_length){
        if(!this.repeat){
          if(typeof this.callback === "function"){
            this.callback();
          }
        } else {
          this.current_i = this.current_i % this.animation_length;
        }
      }
      this.elapsed = this.elapsed % this.interval;
    }
  };

  function SpriteAnimation(spritesheet){
    console.log(spritesheet);
    this.width = spritesheet.data.width / spritesheet.num_x;
    this.height = spritesheet.data.height / spritesheet.num_y;
    this.num_x = spritesheet.num_x;
    this.div_x = 1/this.num_x;
    this.num_y = spritesheet.num_x;
    this.div_y = 1/this.num_y;
    Units.Unit.call(this);
    var geometry = new THREE.PlaneGeometry(this.width, this.height);
    var texture = new THREE.Texture(spritesheet.data);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1/this.num_x, 1/this.num_y);
    var material = new THREE.MeshBasicMaterial({
      map: texture
      //wireframe: true
    });
    texture.needsUpdate = true;
    material.transparent = true;
    this.texture = texture;
    this.mesh = new THREE.Mesh(geometry, material);
    this.animations = {};
    this.current_animation = null;
  }

  SpriteAnimation.prototype = Object.create(Units.Unit.prototype);
  SpriteAnimation.prototype.constructor = SpriteAnimation;
  SpriteAnimation.prototype.set_frame = function(frame){
    this.texture.offset.set(frame % this.num_x * this.div_x, 1 - Math.floor(frame/this.num_x+1)*this.div_y);
    //console.log(this.texture.offset);
  };

  SpriteAnimation.prototype.add_animation = function(name, frames){
    this.animations[name] = new Animation(frames);
  };

  SpriteAnimation.prototype.play_animation = function(name, fps, start_index, repeat, callback){
    this.stop_animation();
    this.current_animation = this.animations[name];
    this.current_animation.current_i = start_index || 0;
    this.set_frame(this.current_animation.frames[this.current_animation.curent_i]);
    this.current_animation.elapsed = 0;
    this.current_animation.interval = 1/fps;
    this.current_animation.repeat = repeat || true;
    this.current_animation.playing = true;
    if(!this.current_animation.repeat){
      this.current_animation.callback = callback;
    }
  };

  SpriteAnimation.prototype.stop_animation = function(fire_callback){
    if(this.current_animation){
      this.current_animation.playing = false;
      if(fire_callback && typeof this.current_animation.callback === "function"){
        this.current_animation.callback();
      }
    }
  };

  SpriteAnimation.prototype.update = function(delta){
    if(this.current_animation){
      this.current_animation.update(delta);
      this.set_frame(this.current_animation.frames[this.current_animation.current_i]);
    }
  };

  return SpriteAnimation;
});
