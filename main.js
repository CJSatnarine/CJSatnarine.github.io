import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Vite import for files.
import headURL from "./models/head.obj?url";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
let modelObject = new THREE.Object3D;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

camera.position.z = 3;

// Lighting. 
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

// OBJ loader. 
const objectLoader = new OBJLoader();
objectLoader.load(
    headURL,
    function(object) {
        console.log(object);
        modelObject = object;
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Create material for the mesh.  
                child.material = new THREE.MeshStandardMaterial({color: 0x962FFE});
                child.material.wireframe = true;
                child.material.wireframeLinewidth = 1;
                child.material.emissive = (new THREE.Color().setHex(0x962FFE));
            }
        });

        scene.add(object);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log('an error happened', error);
    }
);

function animate() {
    modelObject.rotateY(-THREE.MathUtils.degToRad(2));
    renderer.render(scene, camera);
}



















