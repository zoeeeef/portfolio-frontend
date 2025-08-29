import './main.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { MeshReflectorMaterial } from '../static/shaders/MeshReflectorMaterial.js';


// Get the HTML element with the ID "message"
const messageElement = document.getElementById('message');

// Set the text content of that element to "Hello, World!"
messageElement.textContent = 'Hello, World!';


let scene, camera, renderer, mixer;
const clock = new THREE.Clock();

// Initialize the scene, camera, and renderer
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xabcdef);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting to make the model visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the GLB model using GLTFLoader
    const loader = new GLTFLoader();
    loader.load(
        'meanimationwave.glb', // Path to your GLB file
        function (gltf) {
            scene.add(gltf.scene);

            // Check for and play animations
            if (gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(gltf.scene);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
                console.log('Animation loaded and playing!');
            } else {
                console.warn('No animations found in the GLB model.');
            }
        },
        undefined, // Optional progress callback
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
    );

    // Handle window resizing
    window.addEventListener('resize', onWindowResize);
}

// Update camera and renderer on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }

    renderer.render(scene, camera);
}

// Start the application
init();
animate();

