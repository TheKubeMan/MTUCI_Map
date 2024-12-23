import './style.css'
import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { InteractionManager } from 'three.interactive';

//init stuff
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer({ alpha: true });
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);

//variables for rendering and routing
const outlines = [];
let canUpdateOutlines = true;
let sel = [];
const ogSize = [];
let currentModel;
let cabinets = [];
let hallways = [];
let f4, f5, f6, f7;
let pointsT;

//html elements
const div = document.getElementById("data");
const texto = document.getElementById("name");
const f4b = document.getElementById("f4");
const f5b = document.getElementById("f5");
const f6b = document.getElementById("f6");
const f7b = document.getElementById("f7");
const router = document.getElementById("route");
const textField = document.getElementById("input");

//storing every scene inside a variable to later check if the cabinet exists
loader.load("/static/models/floor4.gltf", function (gltf) { f4 = gltf.scene; });
loader.load("/static/models/floor5.gltf", function (gltf) { f5 = gltf.scene; });
loader.load("/static/models/floor6.gltf", function (gltf) { f6 = gltf.scene; });
loader.load("/static/models/floor7.gltf", function (gltf) { f7 = gltf.scene; });

function loadFloor(model) {
  loader.load(
    model,
    function (gltf) {
      if (currentModel != gltf.scene)
      {
        cleanup();
        currentModel = gltf.scene;
        canUpdateOutlines = true;
        scene.add(currentModel);
        currentModel.traverse(function (object) {
          if (!object.name.includes("001") && !object.name.includes("002") && !object.name.includes("toilet")
            && !object.name.includes("Cube") && !object.name.includes("Scene") 
            && !object.name.includes("Entry") && !object.name.includes("Cross")) {
            if (object.name.includes("hallway"))
              hallways.push(object);
            else
              cabinets.push(object);
          }
        });
        if (pointsT)
          drawRoute();
        addListeners();
      }
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

function cleanup() {
  if (currentModel)
  {
    canUpdateOutlines = false;
    for (let i = cabinets.length - 1; i >= 0; i--) {
      const object = cabinets[i];
      if (object) {
        interactionManager.remove(object);
      }
    }
    scene.remove(currentModel);
    const outlinesToRemove = [];
    scene.traverse(function (object) {
      if (object.name.includes("outline") || object.name.includes("route")) {
        outlinesToRemove.push(object);
      }
    });
    for (let i = outlinesToRemove.length - 1; i >= 0; i--) {
      scene.remove(outlinesToRemove[i]);
    }
    currentModel.traverse(function (object) {
      if (object.geometry) object.geometry.dispose();
      if (object.material){ 
        if (object.material.map) 
          object.material.map.dispose();
        object.material.dispose();
      }
      if (object.texture) object.texture.dispose();
    });
    hallways = [];
    cabinets = [];
    console.log("Removing scene...");
  }
  else
    console.log("No scene to remove");
};

//render init stuff
loadFloor("/static/models/floor4.gltf");
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(1500, 800);
camera.position.setZ(30);

//lights
const topLight = new Three.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
const ambientLight = new Three.AmbientLight(0xFFFFFF, 5);
scene.add(topLight);
scene.add(ambientLight);

//materials
const lect = new Three.MeshBasicMaterial({ color: 0x505cfa });
const hover = new Three.MeshBasicMaterial({ color: 0x89ff4f });
const selected = new Three.MeshBasicMaterial({ color: 0xfa7f4c });
const hallway = new Three.MeshBasicMaterial({ color: 0xa490fa });
const lineMaterial = new Three.LineBasicMaterial({ color: 0x000000, linewidth: 3 }); // Customize color and linewidth

//floor change on button click
f4b.addEventListener("click", (event) => {
  loadFloor("/static/models/floor4.gltf");
});
f5b.addEventListener("click", (event) => {
  loadFloor("/static/models/floor5.gltf");
});
f6b.addEventListener("click", (event) => {
  loadFloor("/static/models/floor6.gltf");
});
f7b.addEventListener("click", (event) => {
  loadFloor("/static/models/floor7.gltf");
});

function addListeners() {

  function getTransformedGeometry(mesh) {
    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);
    return geometry;
  }

  function updateOutline(cabinet, index) {
    if (canUpdateOutlines)
    {
      // Check if an outline already exists
      if (outlines[index]) {
        scene.remove(outlines[index]);
      }
      const transformedGeometry = getTransformedGeometry(cabinet);
      const edges = new Three.EdgesGeometry(transformedGeometry);
      outlines[index] = new Three.LineSegments(edges, lineMaterial);
      outlines[index].name = "outline" + index;
      scene.add(outlines[index]);
      renderer.render(scene, camera);
    }
  }

  //hallways
  for (let i = 0; i < hallways.length; i++)
  {
    if (canUpdateOutlines)
    {
      hallways[i].material = hallway;
      const transformedGeometry = getTransformedGeometry(hallways[i]);
      const edges = new Three.EdgesGeometry(transformedGeometry);
      const outline = new Three.LineSegments(edges, lineMaterial);
      outline.name = "outlineH" + i;
      scene.add(outline);
      renderer.render(scene, camera);
    }
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
  renderer.render(scene, camera);
  interactionManager.update();
}

//build route button
router.addEventListener("click", (event) => {
  let inc = false;
  f4.traverse(function (object) {
    if (object.name == textField.value)
      inc = true;
  });
  f5.traverse(function (object) {
    if (object.name == textField.value)
      inc = true;
  });
  f6.traverse(function (object) {
    if (object.name == textField.value)
      inc = true;
  });
  f7.traverse(function (object) {
    if (object.name == textField.value)
      inc = true;
  });
  if (inc)
  {
    // fetch(`/yourNodeEndpoint?str1=${encodeURIComponent(div.textContent)}&str2=${encodeURIComponent(textField.value)}`)
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error("Error:", error));
  
    // async function sendStringsToPython(str1, str2) {
    // const response = await fetch('/process_strings', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ str1: str1, str2: str2 })
    // });

    // if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error("Error:", errorData.error);
    //     return null;
    // }

    // const data = await response.json();
    // return data.result;
    // }

    // async function main() {

    // // pythonProcess.stdin.write(JSON.stringify({ element1: texto.textContent, element2: textField.value }));
    // // pythonProcess.stdin.end();

    // // pythonProcess.stdout.on('data', (data) => {
    // //   drawRoute(data.toString());
    // // });

    // const combinedString = await sendStringsToPython(string1, string2);
    // if (combinedString !== null) {
    //     console.log("Combined string from Python:", combinedString);
    //   }
    // }

    // main();

    const data = {
      element1: texto.textContent,
      element2: textField.value
    };

    fetch('/process_strings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {   
      drawRoute(data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });

    pointsT = "cab404 > cab404Entry > hallway1f4 > hallway2f4 > cab502 > cab504".split(" > ");
    drawRoute();
  }
  else
    alert("Такой аудитории не существует");
});

function drawRoute()
{
  const points = [];
  for (let i = 0; i < pointsT.length; i++)
  {
    currentModel.traverse(function (object) {
      if (object.name == pointsT[i])
        points.push(new Three.Vector3(object.position.x, object.position.y + 3, object.position.z));
    });
  }
  const geom = new Three.BufferGeometry().setFromPoints(points);
  const lineColor = new Three.LineBasicMaterial({ color: 0xff0000 });
  const line = new Three.Line(geom, lineColor);
  line.name = "route";
  scene.add(line);
}

animate();
document.getElementById("app")?.appendChild(renderer.domElement);