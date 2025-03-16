import './style.css';
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let modelObject = new THREE.Object3D;

// Rendering.
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Resizing the camera position based on window width. 
if (window.innerWidth <= 400) {
    camera.position.z = 6.5;
}
if (window.innerWidth > 400 && window.innerWidth <= 650) {
    camera.position.z = 5.5;
}
else if (window.innerWidth > 650 && window.innerWidth <= 915) {
    camera.position.z = 4.5;
} else {
    camera.position.z = 3.5;
}

// Lighting. 
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

// OBJ loader. 
const objectLoader = new OBJLoader();
objectLoader.load(
    "/wolf_head.obj",
    function(object) {
        console.log(object);
        modelObject = object;
        object.traverse((child) => {
            // instance of is apparently the reason god made typescript 
            if (child instanceof THREE.Mesh) {
                // Create material for the mesh.  
                child.material = new THREE.MeshStandardMaterial({ color: 0x962FFE });
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

// Animate function.
function animate() {
    modelObject.rotateY(-THREE.MathUtils.degToRad(1));
    renderer.render(scene, camera);
}
