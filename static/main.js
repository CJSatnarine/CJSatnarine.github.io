import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let modelObject = new THREE.Object3D;

// Rendering.
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#rendering_canvas'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); 
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Change location of canvas. 
let footer = document.querySelector('#footer');
let canvas = document.querySelector('#rendering_canvas');
footer.before(canvas);

// Resizing the camera position based on window width. 
// TODO: This HAS to be changed to be better bruv what even is this??
if (window.innerWidth <= 400) {
    camera.position.z = 6.5;
}
else if (window.innerWidth > 400 && window.innerWidth <= 650) {
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
    let degrees = -0.5;
    modelObject.rotateY(degrees * (Math.PI / 180));
    renderer.render(scene, camera);
    //requestAnimationFrame(animate); // idk why this made things spin out of control lmao
}
