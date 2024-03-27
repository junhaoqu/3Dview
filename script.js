const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Changed to black to match the provided image

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Adjust the renderer to a fixed size for a smaller viewport instead of full window
const renderer = new THREE.WebGLRenderer({ antialias: true });
const CANVAS_WIDTH = 800;  // Set the width of the canvas
const CANVAS_HEIGHT = 600; // Set the height of the canvas
renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
document.getElementById('modelViewer').appendChild(renderer.domElement);

// Updating the camera aspect ratio to match the new fixed size
camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
camera.updateProjectionMatrix();

// Lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(-3, 10, -10);
scene.add(dirLight);

// GLTF Loader
const loader = new THREE.GLTFLoader();
loader.load('correct.glb',
    function (gltf) {
        model = gltf.scene;

        // Assuming the camera's looking down the Z-axis, you can position the model in front of the camera
        //depends on model
        model.position.z = -100; // Adjust this value based on your scene's scale and camera setup
        model.position.y = -10; // Adjust vertical position as needed
        model.position.x = 20; // Adjust horizontal position as needed

        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('An error happened while loading the model:', error);
    }
);


// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // Use if there's no animation loop
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 100;

// Remove the green cube from the scene
// No need to create or add the cube to the scene

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if damping is enabled
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();
