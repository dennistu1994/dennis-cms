define(function(){

  var Resources = {
    //constants
    IMAGE: 0,
    SPRITESHEET: 1
  };

  function Resource(path){
    this.path = path;
    this.loaded = false;
    this.type = Resources.IMAGE;
    this.data = null;
    //defaults to Image Resource
  }

  function Image(path){
    Resource.call(this, path);
  }
  Image.prototype = Object.create(Resource.prototype);
  Image.prototype.constructor = Image;

  function Spritesheet(path, num_x, num_y){
    Resource.call(this, path);
    this.num_x = num_x;
    this.num_y = num_y;
    this.type = Resources.SPRITESHEET;
  }
  Spritesheet.prototype = Object.create(Resource.prototype);
  Spritesheet.prototype.constructor = Spritesheet;

  //=========Images=========
  Resources.test64 = new Image('res/test64.png');
  Resources.grassy_dirt64 = new Image('res/grassy_dirt64.png');
  Resources.cloud0_256 = new Image('res/cloud0_256.png');
  //=========Images=========

  //=========Spritesheets=========
  Resources.ss_abcd = new Spritesheet('res/ss_abcd.png', 2, 2);
  //=========Spritesheets=========
  return Resources;
});
