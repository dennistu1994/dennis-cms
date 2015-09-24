console.log("Hello World!");
requirejs.config({
    baseUrl: '../',
    paths: {
    }
});

var renderer, scene, p_camera, o_camera, cube;

var init = function(resolution) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(resolution.width, resolution.height);
  $(renderer.domElement).appendTo($('#canvas_container'));
  var screen_aspect_ratio = window.innerWidth / window.innerHeight;
  var width, height;
  if(screen_aspect_ratio > resolution.aspect_ratio){
    height = window.innerHeight;
    width = height * resolution.aspect_ratio;
  } else {
    width = window.innerWidth;
    height = width / resolution.aspect_ratio;
  }
  //$(renderer.domElement).width(width).height(width / resolution.aspect_ratio);
  $(renderer.domElement).width(width).height(height);
}

function prepare_scene(resolution) {
  scene = new THREE.Scene();

  var width = resolution.width;
  var height = resolution.height;
  //o_camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
  p_camera = new THREE.PerspectiveCamera( 75, resolution.aspect_ratio, 0.1, 1000 );
  window.p_camera = p_camera;
  scene.add(p_camera);

  //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  //scene.add(light);

  var cubeg = new THREE.BoxGeometry(1, 1, 1);
  var cubem = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  cube = new THREE.Mesh(cubeg, cubem);
  scene.add(cube);

  p_camera.position.z = 5;
}

function load(path, callback) {
  var loader = new THREE.TextureLoader();
  loader.load(
    // resource URL
    path,
    // Function when resource is loaded
    function(texture) {
      // do something with the texture
      var material = new THREE.MeshBasicMaterial({
        map: texture
      });
    },
    // Function called when download progresses
    null,
    // Function called when download errors
    function(xhr) {
      console.log('An error happened');
    }
  );
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, p_camera);
  cube.rotation.y += 0.02;
}

$(function() {
  require(['js/settings/resolutions'], function(Resolutions) {
    init(Resolutions["1080p"]);
    prepare_scene(Resolutions["1080p"]);
    render();
  });

});
