import './style.css'
import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer({ alpha: true });

const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);


loader.load(
  './models/test.gltf',
  function (gltf)
  {
    console.log("hey");
    scene.add(gltf.scene);
  },
  function (xhr)
  {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error)
  {
    console.log(error);
  }
);


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const topLight = new Three.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new Three.AmbientLight(0xFFFFFF, 5);
scene.add(ambientLight);

const geom = new Three.TorusGeometry(10, 3, 16, 100);
const mesh = new Three.MeshBasicMaterial({color : 0xff6347, wireframe: true});
const torus = new Three.Mesh(geom, mesh);

scene.add(torus);

function animate()
{
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);

}

animate();
document.getElementById("app")?.appendChild(renderer.domElement);
