define(['lounge/resources'], function(Resources){
  var Units = {};

  function Unit(){
  }

  function GradientSprite(width, height, color_a, color_b){
    Unit.call(this);
    var geometry = new THREE.PlaneGeometry(width, height);
    var material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors
    });
    geometry.faces[0].vertexColors[0] = new THREE.Color( color_a );
    geometry.faces[0].vertexColors[1] = new THREE.Color( color_b );
    geometry.faces[0].vertexColors[2] = new THREE.Color( color_a );
    geometry.faces[1].vertexColors[0] = new THREE.Color( color_b );
    geometry.faces[1].vertexColors[1] = new THREE.Color( color_b );
    geometry.faces[1].vertexColors[2] = new THREE.Color( color_a );

    this.mesh = new THREE.Mesh(geometry, material);
    window.mesh = this.mesh;
  }
  GradientSprite.prototype = new Unit();
  GradientSprite.prototype.constructor = GradientSprite;

  function Sprite(width, height, image, repeat_x, repeat_y, transparent){
    Unit.call(this);
    var geometry = new THREE.PlaneGeometry(width, height);
    var texture = new THREE.Texture(image);
    var repeat_num_x = 1, repeat_num_y = 1;
    if(repeat_x){
      texture.wrapS = THREE.RepeatWrapping;
      repeat_num_x = width / image.width;
    } if(repeat_y){
      texture.wrapT = THREE.RepeatWrapping;
      repeat_num_y = height / image.height;
    }
    texture.repeat.set(repeat_num_x, repeat_num_y);

    var material = new THREE.MeshBasicMaterial({
      map: texture
    });

    if(transparent){
      material.transparent = true;
    }

    texture.needsUpdate = true;
    this.mesh = new THREE.Mesh(geometry, material);
  }
  Sprite.prototype = new Unit();
  Sprite.prototype.constructor = Sprite;

  Units.Sprite = Sprite;
  Units.GradientSprite = GradientSprite;
  return Units;
});
