import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

var scene, camera, renderer, loader, object;
var canvasContainer = document.getElementById("teapot");

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild(renderer.domElement);
  canvasContainer.appendChild(renderer.domElement);

  loader = new OBJLoader();
  loader.load("teapot.obj", function (obj) {
    console.log(obj);
    object = obj;
    scene.add(object);
  });
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);
  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  object.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
