import './style.css'
import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { InteractionManager } from 'three.interactive';

const sceneF4 = new Three.Scene();
const sceneF5 = new Three.Scene();
const sceneF6 = new Three.Scene();
const sceneF7 = new Three.Scene();
let activeScene;

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer({ alpha: true });
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);
const cabinets = [];
const hallways = [];
const div = document.getElementById("data");
const texto = document.getElementById("name");

function loadFloor(model, scene) {
  loader.load(
    model,
    function (gltf) {
      scene.add(gltf.scene);
      gltf.scene.traverse(function (object) {
        if (!object.name.includes("001") && !object.name.includes("002") && !object.name.includes("toilet")
          && !object.name.includes("Cube") && !object.name.includes("Scene") && !object.name.includes("Entry")) {
          if (object.name.includes("hallway"))
            hallways.push(object);
          else
            cabinets.push(object);
        }
      });
      addListeners(scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log(error);
    }
  );
  animate();
};

loadFloor("../models/floor4.gltf", sceneF4);
loadFloor("../models/floor5.gltf", sceneF5);
loadFloor("../models/floor6.gltf", sceneF6);
loadFloor("../models/floor7.gltf", sceneF7);

renderer.setPixelRatio(window.devicePixelRatio);
console.log(window.innerHeight, window.innerWidth);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//lights
const topLight = new Three.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
const ambientLight = new Three.AmbientLight(0xFFFFFF, 5);
sceneF4.add(topLight);
sceneF4.add(ambientLight);
sceneF5.add(topLight);
sceneF5.add(ambientLight);
sceneF6.add(topLight);
sceneF6.add(ambientLight);
sceneF7.add(topLight);
sceneF7.add(ambientLight);

//materials
const lect = new Three.MeshBasicMaterial({ color: 0x505cfa });
const hover = new Three.MeshBasicMaterial({ color: 0x89ff4f });
const selected = new Three.MeshBasicMaterial({ color: 0xfa7f4c });
const hallway = new Three.MeshBasicMaterial({ color: 0xa490fa });
const lineMaterial = new Three.LineBasicMaterial({ color: 0x000000, linewidth: 3 }); // Customize color and linewidth


function addListeners(scene) {
  const outlines = [];
  let sel = [];
  const ogSize = [];

  function getTransformedGeometry(mesh) {
    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);
    return geometry;
  }

  function updateOutline(cabinet, index) {
    // Check if an outline already exists
    if (outlines[index]) {
      scene.remove(outlines[index]);
    }
    const transformedGeometry = getTransformedGeometry(cabinet);
    const edges = new Three.EdgesGeometry(transformedGeometry);
    outlines[index] = new Three.LineSegments(edges, lineMaterial);
    scene.add(outlines[index]);
    renderer.render(scene, camera);
  }

  //hallways
  for (let i = 0; i < hallways.length; i++)
  {
    hallways[i].material = hallway;
    const transformedGeometry = getTransformedGeometry(hallways[i]);
    const edges = new Three.EdgesGeometry(transformedGeometry);
    const outline = new Three.LineSegments(edges, lineMaterial);
    scene.add(outline);
    renderer.render(scene, camera);
  }

  //cabinets
  for (let i = 0; i < cabinets.length; i++) {
    //adding an outline
    cabinets[i].material = lect;
    ogSize[i] = cabinets[i].scale.clone();
    sel[i] = false;
    updateOutline(cabinets[i], i);
    interactionManager.add(cabinets[i]);

    cabinets[i].addEventListener('click', (event) => {
      if (!sel[i]) {
        // handling outline and material changes
        for (let j = 0; j < cabinets.length; j++)
          {
            cabinets[j].scale.copy(ogSize[j]);
            cabinets[j].material = lect;
            sel[j] = false;
            updateOutline(cabinets[j], j);
            updateOutline(cabinets[j], j);
          }
        event.target.scale.set(event.target.scale.x, event.target.scale.y * 1.5, event.target.scale.z);
        event.target.material = selected;
        sel[i] = true;
        updateOutline(cabinets[i], i);
        updateOutline(cabinets[i], i);

        if (div.style.display === "none") 
          div.style.display = "block";
        texto.textContent = cabinets[i].name;
      }
    });

    cabinets[i].addEventListener('mouseover', (event) => {
      if (!sel[i]) {
        event.target.material = hover;
        document.body.style.cursor = 'pointer';
      }
    });

    cabinets[i].addEventListener('mouseout', (event) => {
      if (!sel[i]) {
        event.target.material = lect;
        document.body.style.cursor = 'default';
      }
    });
  }
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(activeScene, camera);
  interactionManager.update();
}

//build route button
const router = document.getElementById("route");
const textField = document.getElementById("input");
router.addEventListener("click", (event) => {
  let inc = false;
  for (let i = 0; i < cabinets.length; i++)
    if (cabinets[i].name == textField.value)
      inc = true;
  if (inc)
  {
    // fetch(`/yourNodeEndpoint?str1=${encodeURIComponent(div.textContent)}&str2=${encodeURIComponent(textField.value)}`)
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error("Error:", error));

    drawRoute("cab404 > hallway1f4 > hallway2f4 > cab444");
  }
  else
    alert("Такой аудитории не существует");
});

function drawRoute(routeString)
{
  const pointsT = routeString.split(" > ");
  const points = [];
  for (let i = 0; i < pointsT.length; i++)
  {
    for (let j = 0; j < cabinets.length; j++)
      if (cabinets[j].name == pointsT[i])
        points[i] = new Three.Vector3(cabinets[j].position.x, cabinets[j].position.y + 3, cabinets[j].position.z);
    for (let j = 0; j < hallways.length; j++)
      if (hallways[j].name == pointsT[i])
        points[i] = new Three.Vector3(hallways[j].position.x, hallways[j].position.y + 3, hallways[j].position.z);
  }
  const geom = new Three.BufferGeometry().setFromPoints(points);
  const lineColor = new Three.LineBasicMaterial({ color: 0xff0000 });
  const line = new Three.Line(geom, lineColor);
  activeScene.add(line);
}

animate();
document.getElementById("app")?.appendChild(renderer.domElement);