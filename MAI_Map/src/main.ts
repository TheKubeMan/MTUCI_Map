import './style.css'
import * as Three from "three";
// import { GLTFLoader } from 'three/examples/jsm/Addons.js';
// import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { InteractionManager } from 'three.interactive';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer({ alpha: true });
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// const loader = new FBXLoader();
const controls = new OrbitControls(camera, renderer.domElement);

// loader.load(
//   "MAI_map/public/models/test.fbx",
//   function (fbx)
//   {
//     console.log("hey");
//     scene.add(fbx);
//   },
//   function (xhr)
//   {
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//   },
//   function (error)
//   {
//     console.log(error);
//   }
// );


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const topLight = new Three.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new Three.AmbientLight(0xFFFFFF, 5);
scene.add(ambientLight);

const lect = new Three.MeshBasicMaterial({color : 0x3174e0});
const hover = new Three.MeshBasicMaterial({color: 0xe6cc25});
const selected = new Three.MeshBasicMaterial({color: 0xbf6521});
const hallway = new Three.MeshBasicMaterial({color: 0xa7b4c9});
const pract = new Three.MeshBasicMaterial({color: 0x1ba188});

// floor 4A
const cab426 = new Three.Mesh(new Three.BoxGeometry(3, 2, 3.5), lect);
const cab424 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect);
const cab422 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect);
const cab420 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect);
const cab418 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect);
const cab416 = new Three.Mesh(new Three.BoxGeometry(3.5, 2, 3.5), lect);
const cab414a = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3), lect);
//idk
const cab414 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab412 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab410 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab408 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab406 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab404 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab402 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
//hallway
const cab419 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect);
const cab417 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect);
const cab415 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect);
const cab413 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect);
//stairs and toilet
const cab411 = new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2), lect);
const cab409 = new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2), lect);
//stairs and toilet
const cab407 = new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2), lect);
const cab405 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect);
const cab403 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect);
const cab401 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);

// floor 4Б
// const cab40 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);

// floor 5A
const cab530 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab528 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab526 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab524 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab522 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2.5), lect);
const cab520 = new Three.Mesh(new Three.BoxGeometry(5, 2, 3), lect);
const cab518 = new Three.Mesh(new Three.BoxGeometry(2.75, 2, 3), lect);
const cab516 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2.5), lect);
const cab514 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab512 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab510 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect);
const cab508 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 3), lect);
const cab506 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 3), lect);
const cab504 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 3), lect);
const cab502 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
//hallway
const cab523 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);
const cab521 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);
const cab519 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);
const cab517 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);
//toilet and stairs
const cab515 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect);
const cab513 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);
const cab511 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect);
//stairs and toilet
const cab509 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect);
const cab507 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2), lect);
const cab505 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2), lect);
const cab503 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2), lect);
//stairs
const cab501 = new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect);

// floor 6A
const cab630b = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
const cab630a = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
const cab630 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab628 = new Three.Mesh(new Three.BoxGeometry(3, 2, 3), lect);
const cab626 = new Three.Mesh(new Three.BoxGeometry(3, 2, 3), lect);
const cab624 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab622 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab620 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab618 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab616 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab614 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab612 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab610 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab608 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab606 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab604 = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
const cab602 = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
//hallway
const cab623 = new Three.Mesh(new Three.BoxGeometry(3, 2, 3), lect);
const cab621 = new Three.Mesh(new Three.BoxGeometry(1.5, 2, 3), lect);
const cab619 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3), lect);
const cab617 = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
//toilet and stairs
const cab615 = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
const cab613 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab611 = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);
//stairs and toilet
const cab609 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab607 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab605 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
const cab603 = new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect);
//stairs
const cab601 = new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect);

// floor 7A
const cab704 = new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect);
const cab706 = new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect);
const cab708 = new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect);
const cab710 = new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect);
const cab712 = new Three.Mesh(new Three.BoxGeometry(3.5, 2, 2.5), lect);
const cab714 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab716 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab718 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab720 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect);
const cab722 = new Three.Mesh(new Three.BoxGeometry(3.5, 2, 2.5), lect);
//hallway
const cab705 = new Three.Mesh(new Three.BoxGeometry(2.75, 2, 1.5), lect);
const cab707 = new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect);
const cab709 = new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect);
//toilet and stairs
const cab711 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect);
const cab713 = new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect);
//stairs and toilet
const cab715 = new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect);
const cab717 = new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect);
const cab719 = new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect);
const cab721 = new Three.Mesh(new Three.BoxGeometry(2.75, 2, 1.5), lect);

// floor 7Б
const cab750 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab748 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab746 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab744 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab742 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab738 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab736 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab734 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab732 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab730 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab728 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);
const cab726 = new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect);


const edges = new Three.EdgesGeometry( cab426.geometry );
const lineMaterial = new Three.LineBasicMaterial( { color: 0x000000, linewidth: 3 } ); // Customize color and linewidth
const outline = new Three.LineSegments( edges, lineMaterial );
scene.add( outline );

//set position of an object (here it's called mesh)
//mesh.position.set(100, 100, 100);
scene.add(cab426);
interactionManager.add(cab426);
// cab426.addEventListener('click', (event) => {event.target.scale.set(1.0, 1.5, 1.0);});

function animate()
{
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
  interactionManager.update();
}

animate();
document.getElementById("app")?.appendChild(renderer.domElement);
