//variables for setup
let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-8, 3, 25);

  const ambient = new THREE.AmbientLight(0x505050, 1);
  scene.add(ambient);

  const light = new.THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10, 10);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resizer", onWindowResize);
