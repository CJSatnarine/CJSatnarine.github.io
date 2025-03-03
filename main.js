import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Vite import for files.
import headURL from "./models/head.obj?url";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

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

        object.traverse((child) => {
            // Apparently instanceof is a curse. 
            if (child instanceof THREE.Mesh) {
                console.log(child.geometry);
                console.log('is instance of mesh');
                child.material = new THREE.MeshStandardMaterial({color: 0x962FFE});
                child.material.wireframe = true;
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
    renderer.render(scene, camera);
}



















