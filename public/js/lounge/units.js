define(function(){
  var Units = {};

  function Unit(){
    this.position = new THREE.Vector3();
  }

  function Sprite(width, height, image, position){
    Unit.call(this);
    var geometry = new THREE.PlaneGeometry(width, height);
    var texture = new THREE.Texture(image);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      // color: 0xffffff,
      // wireframe: true,
    });
    //texture.needsUpdate = true;
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position = position || (new THREE.Vector3());
  }
  Sprite.prototype = new Unit();
  Sprite.prototype.constructor = Sprite;

  Units.Sprite = Sprite;
  return Units;
});
