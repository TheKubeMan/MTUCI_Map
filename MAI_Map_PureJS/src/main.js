import './style.css'
import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
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

const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);

loader.load(
  "../models/test.gltf",
  function (fbx)
  {
    console.log("hey");
    scene.add(fbx.scene);
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

//lights
const topLight = new Three.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
const ambientLight = new Three.AmbientLight(0xFFFFFF, 5);
scene.add(topLight);
scene.add(ambientLight);

//materials
const lect = new Three.MeshBasicMaterial({color : 0x3174e0});
const hover = new Three.MeshBasicMaterial({color: 0xe6cc25});
const selected = new Three.MeshBasicMaterial({color: 0xbf6521});
const hallway = new Three.MeshBasicMaterial({color: 0xa7b4c9});
const pract = new Three.MeshBasicMaterial({color: 0x1ba188});
const lineMaterial = new Three.LineBasicMaterial( { color: 0x000000, linewidth: 3 } ); // Customize color and linewidth

// const cabinets = [
//   // floor 3
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 4), lect), //cab350
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 4), lect), //cab348
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 4), lect), //cab346
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 4), lect), //cab344
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab342
//   new Three.Mesh(new Three.BoxGeometry(3.25, 2, 4), lect), //cab340
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect), //cab340
  
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.75), lect), //cab351
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.75), lect), //cab349
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2.75), lect), //cab347
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2.75), lect), //cab345
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.75), lect), //cab343
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.75), lect), //cab341
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.75), lect), //cab341a
//   new Three.Mesh(new Three.BoxGeometry(4, 2, 2.75), lect), //cab339
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab335

// // floor 4A
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 3.5), lect), //cab426
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect), //cab424
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect), //cab422
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect), //cab420
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3.5), lect), //cab418
//   new Three.Mesh(new Three.BoxGeometry(3.5, 2, 3.5), lect), //cab416
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3), lect), //cab414a
// //idk
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab414
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab412
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab410
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab408
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab406
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab404
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab402
// //hallway
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect), //cab419
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect), //cab417
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect), //cab415
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect), //cab413
// //stairs and toilet
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2), lect), //cab411
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2), lect), //cab409
// //stairs and toilet
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 2), lect), //cab407
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect), //cab405
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect), //cab403
  
//   // floor 4Б
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab458
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab456
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab454
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab452
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab450
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab448
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab446
//   new Three.Mesh(new Three.BoxGeometry(4.5, 2, 2.5), lect), //cab444

//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab440
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab438
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab436
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 2.5), lect), //cab434
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 2.5), lect), //cab432

//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 1.5), lect), //cab445
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab443
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab441
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab439
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab437
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab435
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 1.5), lect), //cab433
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab431
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab429
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab427
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab425
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab423
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab421

// // floor 5A
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab530
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab528
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab526
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab524
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.5), lect), //cab522
//   new Three.Mesh(new Three.BoxGeometry(5, 2, 3), lect), //cab520
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 3), lect), //cab518
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.5), lect), //cab516
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab514
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab512
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect), //cab510
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 3), lect), //cab508
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 3), lect), //cab506
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 3), lect), //cab504
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab502
// //hallway
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab523
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab521
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab519
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab517
// //toilet and stairs
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect), //cab515
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab513
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect), //cab511
// //stairs and toilet
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab509
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2), lect), //cab507
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2), lect), //cab505
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2), lect), //cab503
// //stairs
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2), lect), //cab501

// // floor 5Б
//   new Three.Mesh(new Three.BoxGeometry(3.25, 2, 2.5), lect), //cab560
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab558
//   new Three.Mesh(new Three.BoxGeometry(3.5, 2, 2.5), lect), //cab556
//   new Three.Mesh(new Three.BoxGeometry(3.25, 2, 2.5), lect), //cab554
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab552
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 2.5), lect), //cab550
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab548
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 2.5), lect), //cab546
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab544
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab542
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab540
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab538
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab536
// //hallway
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect), //cab549
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect), //cab547
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect), //cab545
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 1.5), lect), //cab543
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab541

//   new Three.Mesh(new Three.BoxGeometry(0.75, 2, 1.25), lect), //cab531
//   new Three.Mesh(new Three.BoxGeometry(0.75, 2, 1.25), lect), //cab529
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.25), lect), //cab527
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.25), lect), //cab525

//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.25), lect), //cab532

// // floor 6A
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab630b
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab630a
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab630
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 3), lect), //cab628
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 3), lect), //cab626
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab624
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab622
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab620
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab618
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab616
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab614
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab612
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab610
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab608
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab606
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab604
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab602
// //hallway
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 3), lect), //cab623
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 3), lect), //cab621
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 3), lect), //cab619
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab617
// //toilet and stairs
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab615
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab613
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab611
// //stairs and toilet
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab609
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab607
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab605
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 3), lect), //cab603
// //stairs
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 3), lect), //cab601
  
// // flor 6Б
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab664
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab662
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab660
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab658
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab656
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab654
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab652
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2.5), lect), //cab650
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab648
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab646
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab644
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 2.5), lect), //cab642
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 2.5), lect), //cab640
//   new Three.Mesh(new Three.BoxGeometry(1.25, 2, 2.5), lect), //cab638
//   new Three.Mesh(new Three.BoxGeometry(1.25, 2, 2.5), lect), //cab636

//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 1.5), lect), //cab647
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab645
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab643
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab641
//   new Three.Mesh(new Three.BoxGeometry(2.25, 2, 1.5), lect), //cab639
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab637
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 1.5), lect), //cab635
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab633
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 1.5), lect), //cab631
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 1.5), lect), //cab629
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab627
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab632


// // floor 7A
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 2.5), lect), //cab704
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab706
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2.5), lect), //cab708
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2.5), lect), //cab710
//   new Three.Mesh(new Three.BoxGeometry(3.5, 2, 2.5), lect), //cab712
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab714
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab716
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab718
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2.5), lect), //cab720
//   new Three.Mesh(new Three.BoxGeometry(3.5, 2, 2.5), lect), //cab722
// //hallway
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 1.5), lect), //cab705
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab707
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 1.5), lect), //cab709
// //toilet and stairs
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect), //cab711
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab713
// //stairs and toilet
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab715
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 1.5), lect), //cab717
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab719
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 1.5), lect), //cab721

// // floor 7Б
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect), //cab750
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect), //cab748
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect), //cab746
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect), //cab744
//   new Three.Mesh(new Three.BoxGeometry(2.75, 2, 2), lect), //cab742
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab738
//   new Three.Mesh(new Three.BoxGeometry(3, 2, 2), lect), //cab736
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect), //cab734
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab732
//   new Three.Mesh(new Three.BoxGeometry(2.5, 2, 2), lect), //cab730
//   new Three.Mesh(new Three.BoxGeometry(2, 2, 2), lect), //cab728
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 2), lect), //cab726
// //hallway
//   new Three.Mesh(new Three.BoxGeometry(1.75, 2, 1.5), lect), //cab743
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab741
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab739
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab737
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab735
//   new Three.Mesh(new Three.BoxGeometry(1.2, 2, 1.5), lect), //cab733
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab731
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab729
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab727
//   new Three.Mesh(new Three.BoxGeometry(1.5, 2, 1.5), lect), //cab725
//   new Three.Mesh(new Three.BoxGeometry(1, 2, 1.5), lect), //cab723
//   new Three.Mesh(new Three.BoxGeometry(1.25, 2, 1.5), lect), //cab724
// ];

function getTransformedGeometry(mesh) {
  const geometry = mesh.geometry.clone();
  geometry.applyMatrix4(mesh.matrixWorld);
  return geometry;
}

function updateOutline(cabinetIndex) {
  const cabinet = cabinets[cabinetIndex];
  // Check if an outline already exists
  if (outlines[cabinetIndex]) {
    scene.remove(outlines[cabinetIndex]);
  }
  const transformedGeometry = getTransformedGeometry(cabinet);
  const edges = new Three.EdgesGeometry(transformedGeometry);
  outlines[cabinetIndex] = new Three.LineSegments(edges, lineMaterial);
  scene.add(outlines[cabinetIndex]);
  renderer.render(scene, camera);
}

const edges = [];
const outlines = [];
let sel = [];
// for (let i = 0; i < cabinets.length; i++)
// {
//   sel[i] = false;
//   cabinets[i].name = i;
//   edges[i] = new Three.EdgesGeometry( cabinets[i].geometry );
//   outlines[i] = new Three.LineSegments( edges[i], lineMaterial );
//   scene.add( outlines[i] );
//   scene.add(cabinets[i]);
//   interactionManager.add(cabinets[i]);
//   cabinets[i].addEventListener('click', (event) => {
//     event.target.scale.set(1.0, 1.5, 1.0);
//     event.target.material = selected;
//     sel[i] = true;
//     updateOutline(i);
//     updateOutline(i);
//     console.log(cabinets[i].name);
//     outlines[i].position.set(cabinets[i].position.x, cabinets[i].position.y, cabinets[i].position.z);
//     //display info about the selected cabinet
//     const div = document.getElementById("data");
//     if (div.style.display === "none") {
//         div.style.display = "block";
//     } else {
//         console.log("dud");
//         //make it change to another cabinet
//     }
//   });
//   cabinets[i].addEventListener('mouseover', (event) => {
//     if (!sel[i])
//     {
//       event.target.material = hover;
//       document.body.style.cursor = 'pointer';
//     }
//   });
//   cabinets[i].addEventListener('mouseout', (event) => {
//     if (!sel[i])
//     {
//       event.target.material = lect;
//       document.body.style.cursor = 'default';
//     }
//   });
// }

//set position of an object
// cabinets[2].position.set(10, 10, 10);
// outlines[2].position.set(10, 10, 10);


function animate()
{
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
  interactionManager.update();
}

animate();
document.getElementById("app")?.appendChild(renderer.domElement);