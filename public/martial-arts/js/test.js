console.log("Hello World!");

var renderer, scene, camera, cube;

var init = function(resolution) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(resolution.width, resolution.height);
  document.body.appendChild(renderer.domElement);
  var width = window.innerWidth - 50;
  var height = width / resolution.aspect_ratio;
  console.log(width, height, resolution);
  $(renderer.domElement).width(width).height(width / resolution.aspect_ratio);
}

function prepare_scene(resolution) {
  scene = new THREE.Scene();

  var width = resolution.width;
  var height = resolution.height;
  camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
  //camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  window.cmera = camera;
  scene.add(camera);

  var cubeg = new THREE.BoxGeometry(10, 10, 10);
  var cubem = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  cube = new THREE.Mesh(cubeg, cubem);
  scene.add(cube);

  camera.position.z = 10;
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
  renderer.render(scene, camera);
}

$(function() {
  require(['js/settings/resolutions'], function(Resolutions) {
    init(Resolutions["1080p"]);
    prepare_scene(Resolutions["1080p"]);
    render();
  });

});
