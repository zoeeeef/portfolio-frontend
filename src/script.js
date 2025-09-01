import './main.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

const messageElement = document.getElementById('message');
messageElement.textContent = 'Hello, World!';

let scene, camera, renderer, mixer, controls;
const clock = new THREE.Clock();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // NEW: Lowered camera on Y-axis for a more direct, less angled view
    camera.position.set(0,9,25);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // NEW: Disable zooming to fix the model's size
    controls.enableZoom = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
        'meanimationwave.glb',
        function (gltf) {
            const model = gltf.scene;
            
            model.scale.set(2.5, 2.5, 2.5);

            // NEW: Moved model further to the left
            //model.position.x = -40;
            //model.position.z = -60;
            model.position.set(-20, -2, 0);
            model.lookAt(camera.position.x, model.position.y, camera.position.z);

            //model.lookAt(new THREE.Vector3(0, 0, 0));
            //model.rotation.y = Math.PI; // Math.PI is 180 degrees

            scene.add(model);
            controls.target.copy(model.position);

            if (gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
                console.log('Animation loaded and playing!');
            } else {
                console.warn('No animations found in the GLB model.');
            }
        },
        undefined,
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
    );

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }
    
    controls.update();

    renderer.render(scene, camera);
}

init();
animate();