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
  Image.prototype = new Resource();
  Image.prototype.constructor = Image;

  function Spritesheet(path, num_x, num_y){
    Resource.call(this, path);
    this.num_x = num_x;
    this.num_y = num_y;
    this.type = Resources.SPRITESHEET;
  }
  Spritesheet.prototype = new Resource();
  Spritesheet.prototype.constructor = Spritesheet;

  Resources.test64 = new Image('res/test64.png');
  return Resources;
});
