define(function(){
  var ThreeHelper = {
    renderer: null, scene: null, p_camera: null, o_camera: null, cube: null
  };

  ThreeHelper.init_map = function(resolution, map) {
    this.renderer = new THREE.WebGLRenderer();
    console.log(resolution);
    this.renderer.setSize(resolution.width, resolution.height);
    $(this.renderer.domElement).appendTo($('#container'));
    var screen_aspect_ratio = window.innerWidth / window.innerHeight;
    var width, height;
    var nav_height = 60;
    if(screen_aspect_ratio > resolution.aspect_ratio){
      height = window.innerHeight - nav_height;
      width = height * resolution.aspect_ratio;
    } else {
      width = window.innerWidth - nav_height * resolution.aspect_ratio;
      height = width / resolution.aspect_ratio;
    }
    $(this.renderer.domElement).width(width).height(height);

    this.scene = new THREE.Scene();

    this.p_camera = new THREE.PerspectiveCamera( 90, resolution.aspect_ratio, 0.1, 1000 );
    window.p_camera = this.p_camera;
    this.scene.add(this.p_camera);

    map.units.forEach(function(unit){
      this.scene.add(unit.mesh);
    }.bind(this));
    this.p_camera.position.z = resolution.height/2;

    window.scene = this.scene;
  };

  ThreeHelper.render = function(){
    requestAnimationFrame(ThreeHelper.render);
    ThreeHelper.renderer.render(ThreeHelper.scene, ThreeHelper.p_camera);
  };

  return ThreeHelper;
});
