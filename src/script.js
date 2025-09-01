import './main.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

// const messageElement = document.getElementById('message');
// messageElement.textContent = 'Hello, World!';

let scene, camera, renderer, mixer, controls;
const clock = new THREE.Clock();

let waveModel, talkingModel;
let currentState = 'wave';

// --- ✨ SIMPLIFIED swapContent FUNCTION ---
function swapContent() {
    // Get the HTML button element by its ID
    const myButton = document.getElementById('myHtmlButton');

    // Exit if models haven't loaded yet
    if (!waveModel || !talkingModel) {
        console.log("Models are not ready yet.");
        return;
    }

    if (currentState === 'wave') {
        scene.remove(waveModel);
        scene.add(talkingModel);

        // Change the button's image source
        myButton.src = 'medidyouknowButton.png';

        if (talkingModel.animations && talkingModel.animations.length) {
            mixer = new THREE.AnimationMixer(talkingModel);
            const action = mixer.clipAction(talkingModel.animations[0]);
            action.play();
        }
        currentState = 'talking';
    } else {
        scene.remove(talkingModel);
        scene.add(waveModel);

        // Change the button's image source back
        myButton.src = 'mehitalkButton.png';

        if (waveModel.animations && waveModel.animations.length) {
            mixer = new THREE.AnimationMixer(waveModel);
            const action = mixer.clipAction(waveModel.animations[0]);
            action.play();
        }
        currentState = 'wave';
    }
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 9, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); 
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const gltfLoader = new GLTFLoader();

    gltfLoader.load('meanimationwave.glb', (gltf) => {
        waveModel = gltf.scene;
        waveModel.scale.set(2.5, 2.5, 2.5);
        waveModel.position.set(-18, -3, 0);
        waveModel.lookAt(camera.position.x, waveModel.position.y, camera.position.z);
        waveModel.animations = gltf.animations;
        scene.add(waveModel);
        if (waveModel.animations && waveModel.animations.length) {
            mixer = new THREE.AnimationMixer(waveModel);
            const action = mixer.clipAction(waveModel.animations[0]);
            action.play();
        }
    });

    gltfLoader.load('meanimationomgtalking.glb', (gltf) => {
        talkingModel = gltf.scene;
        talkingModel.scale.set(2.5, 2.5, 2.5);
        talkingModel.position.set(-18, -3, 0);
        talkingModel.lookAt(camera.position.x, talkingModel.position.y, camera.position.z);
        talkingModel.animations = gltf.animations;
    });

    // --- 3D BUTTON AND RAYCASTER CODE REMOVED ---
    // We no longer need to load textures, create a plane, or use a raycaster.

    // --- ✨ NEW HTML BUTTON CLICK LISTENER ---
    // Get our HTML button from the page
    const myButton = document.getElementById('myHtmlButton');
    // Tell it to call swapContent when clicked
    if (myButton) {
        myButton.addEventListener('click', swapContent);
    }
    
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
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