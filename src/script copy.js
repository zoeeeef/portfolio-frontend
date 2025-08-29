import './main.css'
//import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { gsap } from 'gsap';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
//import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
//import { MeshReflectorMaterial } from '../static/shaders/MeshReflectorMaterial.js';
import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

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
        'src/assets/meanwaveanimation.glb', // Path to your GLB file
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


// /////////////////////////////////////////////////////////////////////////
// ///// INTERFACE ELEMENTS
// const loadingBarElement = document.querySelector('.loading-bar')
// const ftsLoader = document.querySelector(".lds-roller");
// // 1. Create a video element programmatically
// const video = document.createElement('video');
// video.src = 'posters/interactiveinterview1.gif'; // The path to your GIF
// video.loop = true;
// video.muted = true; // Essential for autoplay
// video.playsInline = true;
// video.crossOrigin = 'anonymous'; // Helps prevent CORS issues

// /////////////////////////////////////////////////////////////////////////
// ///// MAIN VARIABLES
// /////////////////////////////////////////////////////////////////////////
// let camera, scene, renderer, light, controls;
// let  textureLoader, loader, loadingManager;
// let gui;
// let mehologramModel;
// let touchscreenModel; // Declare a variable to hold your new model
// let videosampleModel;
// let programmingsampleModel;
// let protoModel;
// let braingameModel;
// let phoneModel;
// let clockModel;
// let filmModel;
// let newsModel;
// let vrModel;

// /////////////////////////////////////////////////////////////////////////
// ///// DEBUG ENABLER
// /////////////////////////////////////////////////////////////////////////
// let debug = false; //use /#debug in the end of the address to enable debug mode and tweak the mesh reflector

// if(window.location.hash) {
//     var hash = window.location.hash.substring(1);
// } else {
//     ftsLoader.parentNode.removeChild(ftsLoader);
// }

// if (hash == "debug") {
//     debug = true;
//     gui = new GUI();
//     ftsLoader.parentNode.removeChild(ftsLoader);
// }

// //////////////////////////////////////////////////
// //// LOADING MANAGER
// /////////////////////////////////////////////////

//     loadingManager = new THREE.LoadingManager(
//         // Loaded
//         () => {
//             loadingBarElement.parentNode.removeChild(loadingBarElement)
//             gsap.to("#loading-text-intro", {y: '100%', 
//             onComplete: function(){    
//                 document.getElementById("loading-text-intro").parentNode.removeChild(document.getElementById("loading-text-intro"));
//             }, duration: 0.9, ease: 'power3.inOut'})
//         },

//         // Progress
//         (itemUrl, itemsLoaded, itemsTotal) => {
//             const progressRatio = itemsLoaded / itemsTotal
//             loadingBarElement.style.transform = `scaleX(${progressRatio})`
//         }
//     )

// //////////////////////////////////////////////////
// //// DRACO LOADER CONFIG
// /////////////////////////////////////////////////
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
// dracoLoader.setDecoderConfig({ type: 'js' });
// textureLoader = new THREE.TextureLoader(loadingManager);
// loader = new GLTFLoader(loadingManager);
// loader.setDRACOLoader(dracoLoader);

// /////////////////////////////////////////////////////////////////////////
// ///// SCENE CREATION AND RENDERER CONFIG
// /////////////////////////////////////////////////////////////////////////
// const container = document.createElement('div');
// document.body.appendChild(container);
// scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
// renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
// renderer.autoClear = true;
// renderer.setPixelRatio(2); //Performance
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputEncoding = THREE.sRGBEncoding;
// container.appendChild(renderer.domElement);

// /////////////////////////////////////////////////////////////////////////
// ///// ENVMAP LOADER
// /////////////////////////////////////////////////////////////////////////
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// pmremGenerator.compileEquirectangularShader();
// let newEnvMap
// textureLoader
// .load(
//     // This path is likely correct as it's directly from the root
//     "textures/dreifaltigkeitsberg_1k.exr",
//     function (texture) {
//         let exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
//         newEnvMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
//         // loadObjectAndAndEnvMap(); // Add envmap once the texture has been loaded
//         texture.dispose();
//     }
// );

// /////////////////////////////////////////////////////////////////////////
// ///// CAMERAS CONFIG
// camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
// camera.position.set(-2, 0.8, 4);

// /////////////////////////////////////////////////////////////////////////
// ///// CONTROLS
// /////////////////////////////////////////////////////////////////////////
// controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = true
// controls.screenSpacePanning = false;
// controls.enabled = true;
// controls.autoRotate = false
// controls.minDistance = 2
// controls.maxDistance = 5
// controls.maxPolarAngle = Math.PI / 2.15

// /////////////////////////////////////////////////////////////////////////
// ///// LIGHTS CONFIG
// const ambient = new THREE.AmbientLight(0xd9d9eb, 0.15); //Performance issue
// scene.add(ambient);

// light = new THREE.PointLight(0xefeff7, 0.096); //Performance issue
// light.position.set(75, 62, -90);
// scene.add(light);


// const tableSpotLight = new THREE.PointLight(0xefeff7, 0.70); // (color, intensity)
// tableSpotLight.position.y += 5; // Raise it above the table
// tableSpotLight.castShadow = true; // Enable shadow casting
// tableSpotLight.shadow.camera.near = 0.5; // Near clipping plane for shadows
// tableSpotLight.shadow.camera.far = 10; // Far clipping plane for shadows
// tableSpotLight.shadow.camera.fov = 30; // Field of view for the shadow camera
// tableSpotLight.shadow.bias = -0.01; // Bias to reduce shadow acne
// tableSpotLight.angle = Math.PI / 5;     // Adjust width of the light cone
// tableSpotLight.penumbra = 0.5;          // Soften the edge
// tableSpotLight.target = braingameModel; // Make it point directly at the table model
// scene.add(tableSpotLight);



// /////////////////////////////////////////////////////////////////////////
// ///// POSTER CREATION FUNCTION
// /////////////////////////////////////////////////////////////////////////
// function createPoster(imagePath, width = 2, height = 3, position, rotation = 0) {
//     console.log('Creating poster:', imagePath, 'at position:', position);
    
//     // Load the poster texture
//     const posterTexture = textureLoader.load(
//         imagePath,
//         (texture) => {
//             console.log('Poster texture loaded successfully:', imagePath);
//             texture.encoding = THREE.sRGBEncoding;
//         },
//         undefined,
//         (error) => {
//             console.error('Error loading poster texture:', imagePath, error);
//         }
//     );
    
//     // Create poster geometry and material
//     const posterGeometry = new THREE.PlaneGeometry(width, height);
    
//     // Add this line to flip the poster's orientation
//     posterGeometry.rotateY(Math.PI);
    
//     const posterMaterial = new THREE.MeshBasicMaterial({ 
//         map: posterTexture,
//         side: THREE.DoubleSide
//     });
    
//     // Create the poster mesh
//     const posterMesh = new THREE.Mesh(posterGeometry, posterMaterial);
    
//     // Set position and rotation
//     posterMesh.position.set(position.x, position.y, position.z);
//     posterMesh.rotation.y = rotation;
    
//     // Add to scene
//     scene.add(posterMesh);
    
//     // Optional: Add a frame around the poster
//     const frameGeometry = new THREE.BoxGeometry(width + 0.1, height + 0.1, 0.05);
//     const frameMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x222222,
//         metalness: 0.8,
//         roughness: 0.2
//     });
//     const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
//     frameMesh.position.copy(posterMesh.position);
//     frameMesh.rotation.copy(posterMesh.rotation);
//     frameMesh.position.add(new THREE.Vector3(
//         Math.sin(rotation) * 0.03,
//         0,
//         Math.cos(rotation) * 0.03
//     ));
//     scene.add(frameMesh);
    
//     return { poster: posterMesh, frame: frameMesh };
// }
// // 2. Play the video
// // The .play() method returns a Promise, which can be useful for handling errors
// video.play().catch(error => {
//     console.error("Video play failed:", error);
// });


// // 3. Create a video texture from the element
// const gifTexture = new THREE.VideoTexture(video);

// // 4. Create your material and apply the texture
// const gifMaterial = new THREE.MeshBasicMaterial({
//     map: gifTexture,
// });

// const gifGeometry = new THREE.PlaneGeometry(2, 2);
// const gifMesh = new THREE.Mesh(gifGeometry, gifMaterial);

// scene.add(gifMesh);
// /////////////////////////////////////////////////////////////////////////
// ///// LOADING MODEL
// /////////////////////////////////////////////////////////////////////////
// let woodFloor2, woodfloor;

// // Load the art gallery model
// // CORRECTED PATH HERE: 'static/models/gltf/art-gallery-final.glb'
// loader.load('models/gltf/art-gallery-final.glb', function (gltf) {
//     gltf.scene.traverse((o) => { 
//         if (o.isMesh) {
//             if (o.name == 'floor') {
//                 woodfloor = o
//                 setupReflectorMaterial(woodfloor)
//                  addReflectorGUI2(woodfloor);
//             }
//             if (o.name == 'floor2') {
//                 woodFloor2 = o
//                 setupReflectorMaterial2(woodFloor2)
//                 addReflectorGUI2(woodFloor2);
//             }
//         }
//     });
//     scene.add(gltf.scene)
    
//     // Add posters after the gallery is loaded
//     addPostersToGallery();
// });

// // Load your new mehologramglb.gltf model
// // CORRECTED PATH HERE: 'static/models/gltf/mehologramglb.gltf'
// loader.load('models/gltf/mehologramgold.glb', function (gltf) {
//     mehologramModel = gltf.scene;

//     // --- TEMPORARY DEBUGGING CODE START ---
//     mehologramModel.traverse(function (child) {
//         if (child.isMesh) {
//             console.log("Mesh found:", child.name);
//             console.log("Material type:", child.material.type); // Should be "MeshStandardMaterial"
//             console.log("Material map (base color texture):", child.material.map);
//             console.log("Material normalMap:", child.material.normalMap);
//             console.log("Material roughnessMap:", child.material.roughnessMap);
//             console.log("Material metalnessMap:", child.material.metalnessMap);

//             // Optional: Temporarily switch to a basic material to confirm geometry is visible
           
//             child.material = new THREE.MeshBasicMaterial({ color: 0xFFD700, side: THREE.DoubleSide });
//             metalness: 1.0, 
              
//             child.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
//             const goldMaterial = new THREE.MeshStandardMaterial({
//                 color: new THREE.Color(0xFFD700), // Hex code for a golden yellow color
//                 metalness: 1.0,                   // 1.0 means fully metallic
//                 roughness: 1.0,                   // Low roughness for shiny gold, increase for matte gold
//                 // envMap: environmentMap,        // VERY IMPORTANT for realistic reflections (see next section)
//             });
//         }
//     });
//     // --- TEMPORARY DEBUGGING CODE END ---

//     mehologramModel.position.set(0, .8, 0);
//     mehologramModel.scale.set(0.15, 0.15, 0.15);
//     scene.add(mehologramModel);
//     console.log('mehologramgold.glb loaded successfully!');
// }, undefined, function (error) {
//     console.error('An error occurred while loading mehologramgold.glb:', error);
// });

// loader.load('models/gltf/meinfotouchscreen.glb', function (gltf) {
//     touchscreenModel = gltf.scene; 

//     touchscreenModel.position.set(0, 0, 1
//     );
//     touchscreenModel.scale.set(0.15, 0.15, 0.15);
//     touchscreenModel.rotation.y = Math.PI / 2; // Rotate to face the viewer
//     scene.add(touchscreenModel);
//     console.log('meinfotouchscreen.glb loaded successfully!');
// }, undefined, function (error) {
//     console.error('An error occurred while loading meinfotouchscreen.glb:', error);
// });

// loader.load('models/gltf/videoproductionsamples.glb', function (gltf) {
//    videosampleModel = gltf.scene; 

//     videosampleModel.position.set(-1.4, -.1, -3.7
//     );
//     videosampleModel.scale.set(0.25, 0.25, 0.25);
//     videosampleModel.rotation.y = -Math.PI/2; // Rotate to face the viewer
//     scene.add(videosampleModel);
//     console.log('videoproductionsamples.glb loaded successfully!');
// }, undefined, function (error) {
//     console.error('An error occurred while loading videoproductionsamples.glb:', error);
// });

// loader.load('models/gltf/programmingdesign.glb', function (gltf) {
//    programmingsampleModel = gltf.scene; 

//     programmingsampleModel.position.set(1.2, -.1, -4.3
//     );
//    programmingsampleModel.scale.set(0.25, 0.25, 0.25);
//    programmingsampleModel.rotation.y = -Math.PI/2; // Rotate to face the viewer
//     scene.add(programmingsampleModel);;
//     console.log('programmingdesign.glb loaded successfully!');
// }, undefined, function (error) {
//    console.error('An error occurred while loading programmingdesign.glb:', error);
// });
//    loader.load('models/gltf/qandadisplay.glb', function (gltf) {
//   protoModel = gltf.scene; 

//    protoModel.position.set(4.1, -.1, -2.8
//    );
//    protoModel.scale.set(0.25, 0.3, 0.25);
//    protoModel.rotation.y = Math.PI; // Rotate to face the viewer
//     scene.add(protoModel);;
//     console.log('qandadisplay.glb loaded successfully!');
// }, undefined, function (error) {
//    console.error('An error occurred while loading qandadisplay.glb:', error);

// });

// loader.load('models/gltf/braingametable3.glb', function (gltf) {
//   braingameModel = gltf.scene; 



//    braingameModel.position.set(4.1, -.1, .9
//    );
//    braingameModel.scale.set(0.35, 0.35, 0.35);
//    braingameModel.rotation.y = Math.PI; // Rotate to face the viewer
//     scene.add(braingameModel);;
//     console.log('braingametable3.glb loaded successfully!');
// }, undefined, function (error) {
//   console.error('An error occurred while loading braingametable3.glb:', error);

// });

// loader.load('models/gltf/phoneboothexhibit2final1.glb', function (gltf) {
//   phoneModel = gltf.scene; 



//    phoneModel.position.set(3, 0, 4.2
//    );
//    phoneModel.scale.set(0.3, 0.3, 0.3);
//    phoneModel.rotation.y = Math.PI/2; // Rotate to face the viewer
//     scene.add(phoneModel);;
//     console.log('phoneboothexhibit2final1.glb loaded successfully!');
// }, undefined, function (error) {
//   console.error('An error occurred while loading phoneboothexhibit2final1.glb:', error);

// });

// loader.load('models/gltf/cuckoo2.glb', function (gltf) {
//   clockModel = gltf.scene; 



//    clockModel.position.set(1.5, 0, 4.2
//    );
//    clockModel.scale.set(0.25, 0.2, 0.25);
//    clockModel.rotation.y = -Math.PI/2; // Rotate to face the viewer
//     scene.add(clockModel);;
//     console.log('cuckoo2.glb loaded successfully!');
// }, undefined, function (error) {
//   console.error('An error occurred while loading cuckoo2.glb:', error);

// });

// loader.load('models/gltf/filmscreen.glb', function (gltf) {
//   filmModel = gltf.scene; 



//    filmModel.position.set(-3, 0, 5
//    );
//    filmModel.scale.set(0.25, 0.5, 0.25);
//    filmModel.rotation.y = Math.PI/2; // Rotate to face the viewer
//     scene.add(filmModel);;
//     console.log('filmscreen.glb loaded successfully!');
// }, undefined, function (error) {
//   console.error('An error occurred while loading filmscreen.glb:', error);

// });

// loader.load('models/gltf/newsscreens.glb', function (gltf) {
//   newsModel = gltf.scene; 



//    newsModel.position.set(-4.5, .1, 3.7
//    );
//    newsModel.scale.set(0.6, .8, 0.6);
//    newsModel.rotation.y = Math.PI/2; // Rotate to face the viewer
//     scene.add(newsModel);;
//     console.log('newsscreens.glb loaded successfully!');
// }, undefined, function (error) {
//   console.error('An error occurred while loading newsscreens.glb:', error);

// });
// //-4.5, .1, 2
// loader.load('models/gltf/vrdisplay.glb', function (gltf) {
//   vrModel = gltf.scene; 


// //-4.3, -.2, 4.5
//    vrModel.position.set(-4.3, -.2, 3.1
//    );
//    vrModel.scale.set(0.35, .35, 0.35);
// //    vrModel.rotation.x = Math.PI; // Rotate to face the viewer
//     scene.add(vrModel);;
//     console.log('vrdisplay.glb loaded successfully!');
// }, undefined, function (error) {
//   console.error('An error occurred while loading vrdisplay.glb:', error);

// });
// /////////////////////////////////////////////////////////////////////////
// ///// ADD POSTERS TO GALLERY
// /////////////////////////////////////////////////////////////////////////
// function addPostersToGallery() {
//     console.log('Adding posters to gallery...');
//     const backWallZ = -5; // Slightly in front of the wall to prevent z-fighting
//     const wallHeight = 1.5; // Height where posters should be centered
    

//     // Add poster on the back wall (facing forward)
//     // CORRECTED PATHS FOR POSTERS IF THEY ARE NOT LOADING (based on the same logic)
//     createPoster(
//         'posters/IMG_7597.jpg',
//         1.3,
//         2,
//         // The Z position is adjusted to be flush with the wall at z = -3
//         { x: -2.2, y: wallHeight, z: backWallZ },
//         Math.PI 
//     );
    
//     // Add poster on the right wall (facing left)
//     createPoster(
//         'posters/skillsposter.png',
//         2.8,
//         2,
//         // The X position is adjusted to be flush with the wall at x = 3
//         { x: 2.975, y: wallHeight, z: backWallZ },
//         Math.PI 
//     );
    
//     // Add poster on the left wall (facing right)
//     createPoster(
//         'posters/aboutmeposter.png',
//         1.5,
//         2,
//         // The X position is adjusted to be flush with the wall at x = -3
//         { x: -4, y: wallHeight, z: backWallZ },
//         -Math.PI 
//     );

//     createPoster(
//         'posters/photoposters2.png',
//         2.3,
//         2,
//         // The X position is adjusted to be flush with the wall at x = -3
//         { x: 0, y: wallHeight, z: backWallZ },
//         -Math.PI 
//     );

//      createPoster(
//       'posters/interviewpreview.png',
//         .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+.8 },
//         Math.PI/2 
//     );

//       createPoster(
//       'posters/interactiveinterviewposter1.gif',
//        1.3,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+2 },
//         Math.PI/2 
//     );

//       createPoster(
//       'posters/interactiveinterviewposter2.png',
//        1.3,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+3.4 },
//        Math.PI/2 
//     );

//      createPoster(
//       'posters/brainintro.png',
//        .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+5 },
//        Math.PI/2 
//    );

//    createPoster(
//       'posters/braingameposter1.png',
//        1.3,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+6.2 },
//        Math.PI/2 
//    );

//    createPoster(
//       'posters/braingameposter2.png',
//        1.3,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+7.6 },
//        Math.PI/2 
//    );

//     createPoster(
//       'posters/discretion.png',
//        .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5, y: wallHeight, z: backWallZ+9.2 },
//        Math.PI/2 
//    );

//     createPoster(
//       'posters/sonicpreview.png',
//        .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5-.6, y: wallHeight, z: backWallZ+10 }
//     //    Math.PI 
//    );

//     createPoster(
//       'posters/weepy.gif',
//        1.1,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5-2, y: wallHeight, z: backWallZ+10 }
//     //    Math.PI 
//    );

//     createPoster(
//       'posters/invasion.gif',
//        1.1,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5-3.4, y: wallHeight, z: backWallZ+10 }
//     //    Math.PI 
//    );

//    createPoster(
//       'posters/filmposter.png',
//        1.2,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5-6.5, y: wallHeight, z: backWallZ+10 }
//     //    Math.PI 
//    );

//     createPoster(
//       'posters/film1intro.png',
//        .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: 5-9.4, y: wallHeight-.08, z: backWallZ+10 }
//     //    Math.PI 
//    );

//    createPoster(
//       'posters/thesisintro.png',
//        .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: -5, y: wallHeight, z: backWallZ +.8},
//        -Math.PI/2
//    );

//     createPoster(
//       'posters/thesiswarning.png',
//        .8,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: -5, y: wallHeight, z: backWallZ +1.7},
//        -Math.PI/2
//    );
//     createPoster(
//       'posters/purposethesis.png',
//        1.2,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: -5, y: wallHeight, z: backWallZ +3},
//        -Math.PI/2
//    );

//      createPoster(
//       'posters/emilythesis.png',
//        1.2,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: -5, y: wallHeight, z: backWallZ +4.3},
//        -Math.PI/2
//    );

//        createPoster(
//       'posters/hierarchy.png',
//        1.2,
//         2,
//          //The X position is adjusted to be flush with the wall at x = -3
//         { x: -5, y: wallHeight, z: backWallZ +5.6},
//        -Math.PI/2
//    );
// }

// function setupReflectorMaterial(object){
//     const woodfloorDifuse = object.material.map;
//     object.material = new MeshReflectorMaterial(renderer, camera, scene, object,
//         {
//             mixBlur: 1.4,
//             mixStrength: 6,
//             resolution: 512,
//             blur: [2048, 2048],
//             minDepthThreshold: 0,
//             maxDepthThreshold: 6.68,
//             depthScale: 11.4,
//             depthToBlurRatioBias: 0.9,
//             mirror: 0,
//             distortion: 1,
//             mixContrast: 0.97,
//             reflectorOffset: 0,
//             bufferSamples: 8,
//             planeNormal: new THREE.Vector3(0, 0, 1)
//         });
//         object.material.setValues({
//             map: woodfloorDifuse,
//             emissiveMap: woodfloorDifuse,
//             emissive: new THREE.Color(0xffffff),
//             emissiveIntensity: 0.2,
//             envMapIntensity: 1.08,
//             roughness:1,
//         })
// }

// function setupReflectorMaterial2(object){
//     const woodfloorDifuse = object.material.map;
//     object.material = new MeshReflectorMaterial(renderer, camera, scene, object,
//         {
//             mixBlur: 1.4,
//             mixStrength: 3.9,
//             resolution: 1024,
//             blur: [2048, 2048],
//             minDepthThreshold: 1.2,
//             maxDepthThreshold: 0.43,
//             depthScale: 1.3,
//             depthToBlurRatioBias: 0.36,
//             mirror: 0,
//             distortion: 1,
//             mixContrast: 1.27,
//             reflectorOffset: 0,
//             bufferSamples: 8,
//             planeNormal: new THREE.Vector3(0, 0, 1)
//         });
//         object.material.setValues({
//             map: woodfloorDifuse,
//             emissiveMap: woodfloorDifuse,
//             emissive: new THREE.Color(0xffffff),
//             emissiveIntensity: 0.36,
//             envMapIntensity: 1.08,
//             roughness:1,
//         })
// }

// function addReflectorGUI2(object){
//     if (debug){
//         gui.add(object.material, 'roughness').min(0).max(2).step(0.001)
//         gui.add(object.material, 'envMapIntensity').min(0).max(2).step(0.001)
//         gui.add(object.material, 'emissiveIntensity').min(0).max(2).step(0.001)
//         gui.add(object.material, 'metalness').min(0).max(2).step(0.001)
//         gui.add(object.material.reflectorProps, 'mixBlur').min(0).max(7).step(0.001)
//         gui.add(object.material.reflectorProps, 'mixStrength').min(0).max(200).step(0.001)
//         gui.add(object.material.reflectorProps, 'depthScale').min(0).max(20).step(0.1)
//         gui.add(object.material.reflectorProps, 'mixContrast').min(0).max(7).step(0.001)
//         gui.add(object.material.reflectorProps, 'minDepthThreshold').min(0).max(7).step(0.001)
//         gui.add(object.material.reflectorProps, 'depthToBlurRatioBias').min(0).max(7).step(0.001)
//         gui.add(object.material.reflectorProps, 'maxDepthThreshold').min(-5).max(7).step(0.001).onChange(function(){
//             object.material.needsUpdate = true;
//         })
//     }
// }

// /////////////////////////////////////////////////////////////////////////
// ///// EVENT LISTENERS
// /////////////////////////////////////////////////////////////////////////
// document.addEventListener('mousedown', onMouseDown);
// document.addEventListener('mouseup', onMouseUp);
// window.addEventListener('resize', onWindowResize);

// /////////////////////////////////////////////////////////////////////////
// ///// MOUSE FUNCTIONS
// /////////////////////////////////////////////////////////////////////////

// function onWindowResize() {

//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();

//     renderer.setSize(width, height);
//     renderer.setPixelRatio(2)
// }

// function onMouseDown() {
//     document.getElementById('body').style.cursor = 'grabbing';    
// }

// function onMouseUp() {
//     document.getElementById('body').style.cursor = 'grab';

// }

// if (debug ==true){
//     gui.closed = true;
// }

// //////////////////////////////////////////////////
// //// ANIMMATE
// function animate() {
//     if (woodfloor){
//         woodfloor.material.update(); // the mesh relfector doesn't work without this
//         woodFloor2.material.update();  // we need to update twice bc we have two meshes
//     } 
    
//     controls.update();
//     renderer.render(scene, camera);

//     requestAnimationFrame(animate);
    
// }
// animate();