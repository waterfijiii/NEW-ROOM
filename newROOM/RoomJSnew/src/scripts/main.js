import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

// Camera and Scene
const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 200;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2.5, // left
    cameraWidth / 2.5, // right
    cameraHeight / 2.5, // top
    cameraHeight / -2.5, // bottom
    0, // near plane
    1000 // far plane
);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
const ambientLight = new THREE.AmbientLight(0xf5f5dc, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xEEB4B4, 0.6);
directionalLight.position.set(100, 700, 500);
scene.add(directionalLight);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Room Code
// Walls
function generateBaseWall() {
    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(100, 20, 4),
        new THREE.MeshToonMaterial({ color: 0xfff4e6 }) // wall color
    );
    return wall;
}

// Create room
function generateRoom() {
    const room = new THREE.Group();

    const leftWall = generateBaseWall();
    leftWall.rotation.y = 17.28;
    leftWall.position.set(-47.9, 3.6);
    room.add(leftWall);

    const rightWall = generateBaseWall();
    rightWall.position.set(0, 3.6, -50);
    room.add(rightWall);

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 3, 3),
        new THREE.MeshToonMaterial({ color: 0xbe9b7b })
    );
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 11;
    floor.position.y = -6.5;
    room.add(floor);

    //cross altar
    function generateCrossWindow() {
    const windowMaterial = new THREE.MeshToonMaterial({ color: 0x8B4513, transparent: true, opacity: 0.8 });
    
    // Vertical part of the window
    const verticalWindow = new THREE.Mesh(
        new THREE.BoxGeometry(4, 20, 3),
        windowMaterial
    );
    verticalWindow.position.set(0, 3, -47.5);
    
    // Horizontal part of the window
    const horizontalWindow = new THREE.Mesh(
        new THREE.BoxGeometry(15, 4, 3),
        windowMaterial
    );
    horizontalWindow.position.set(0, 5, -47.5);

    const crossWindow = new THREE.Group();
    crossWindow.add(verticalWindow, horizontalWindow);

    return crossWindow;
}

    //brown carpet
    function generateCarpet() {
    const carpet = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshToonMaterial({ color: 0x253529 }) // dark brown color
    );
    carpet.rotation.x = -Math.PI / 2; // Lay the carpet flat on the floor
    carpet.position.set(-0.1, -5, -30); // Adjust position as needed
    return carpet;
}

    // Add the carpet to the room
    const carpet = generateCarpet();
    room.add(carpet);

    // Add the cross window to the room
    const crossWindow = generateCrossWindow();
    room.add(crossWindow);

    // Bed Code
    function generateBed() {
        const bed = new THREE.Mesh(
            new THREE.BoxGeometry(30, 5, 50),
            new THREE.MeshToonMaterial({ color: 0x654321 }) // bed color
        );
        bed.position.set(-30, 0.05, -20); // adjust position as needed

        // Light effect under the bed
        const lightUnderBed = new THREE.SpotLight(0xffffff, 0.3);
        lightUnderBed.position.set(0, -2, 0); // Adjust position to be under the bed
        lightUnderBed.target.position.set(0, 0, 0); // Target the light to the center of the bed
        bed.add(lightUnderBed);

        return bed;
    }
    const bed = generateBed();
    room.add(bed);

    
    // Function to generate a pillow
    function generatePillow() {
        const pillow = new THREE.Mesh(
            new THREE.BoxGeometry(25, 5, 15),
            new THREE.MeshToonMaterial({ color: 0xffffff })
        );

        pillow.position.set(0.2, 3, -15);

        return pillow;
    }

    // Blanket
    function generateBlanket() {
        const blanket = new THREE.Mesh(
            new THREE.BoxGeometry(30, 1, 50),
            new THREE.MeshToonMaterial({ color: 0x2C1608 })
        );

        blanket.position.set(0.2, 3, 0.3);

        return blanket;
    }

    //blanket
    const blanket = generateBlanket();
    bed.add(blanket);

    //pillow
    const pillow = generatePillow();
    bed.add(pillow);

    //Bed 
    function generateBed() {
        const bed = new THREE.Group();

        // Bed Base
        const bedBase = new THREE.Mesh(
            new THREE.BoxGeometry(30, 5, 50),
            new THREE.MeshToonMaterial({ color: 0x654321 }) // bed color
        );
        bed.add(bedBase);

        // Bed Legs
        const legGeometry = new THREE.CylinderGeometry(1, 1, 10, 8);
        const bedLeg1 = new THREE.Mesh(legGeometry, new THREE.MeshToonMaterial({ color: 0x654321 })); // leg color
        const bedLeg2 = bedLeg1.clone();
        const bedLeg3 = bedLeg1.clone();
        const bedLeg4 = bedLeg1.clone();

        bedLeg1.position.set(10, -2.5, -23);
        bedLeg2.position.set(-10, -2.5, -17);
        bedLeg3.position.set(-10, -2.5, 20);
        bedLeg4.position.set(10, -2.5, 20);

        bed.add(bedLeg1, bedLeg2, bedLeg3, bedLeg4);
        bed.position.set(-30, 0.05, -20);
        return bed;
    }

    //basketball ring
    function generateSmallBasketballRing() {
        const poleHeight = 20;
        const ringRadius = 8;

        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, poleHeight, 30),
            new THREE.MeshToonMaterial({ color: 0x8B4513 }) // pole color
        );

        const backboard = new THREE.Mesh(
            new THREE.BoxGeometry(15, 1, 10),
            new THREE.MeshToonMaterial({ color: 0x808080 }) // backboard color
        );
        backboard.position.set(-2, poleHeight / 2, 1);
        backboard.rotation.x = Math.PI / 2;

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(ringRadius, 0.5, 8, 16),
            new THREE.MeshToonMaterial({ color: 0xFFA500 }) // ring color
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(-1.7, poleHeight - 13, 9.5);

        const smallBasketballRing = new THREE.Group();
        smallBasketballRing.add(pole, backboard, ring);
        smallBasketballRing.position.set(50, poleHeight / 2, -45);
        return smallBasketballRing;
    }
    const smallBasketballRing = generateSmallBasketballRing();
    scene.add(smallBasketballRing);

    // Function to generate RGB lights behind the backboard
    function generateRGBLights() {
    const redLight = new THREE.PointLight(0xFF0000, 1, 5);
    const greenLight = new THREE.PointLight(0x00FF00, 1, 5);
    const blueLight = new THREE.PointLight(0x0000FF, 1, 5);

    redLight.position.set(-2, 10, 6);
    greenLight.position.set(-2, 10, 8);
    blueLight.position.set(-2, 10, 10);

    const lightsGroup = new THREE.Group();
    lightsGroup.add(redLight, greenLight, blueLight);

    return lightsGroup;
}

// Add the RGB lights behind the backboard to the scene
const rgbLights = generateRGBLights();
scene.add(rgbLights);

    //basketball
    function generateBasketball() {
        const basketball = new THREE.Mesh(
            new THREE.SphereGeometry(3.5, 16, 16),
            new THREE.MeshToonMaterial({ color: 0x964B00 }) // basketball color
        );
        basketball.position.set(30, -1.5, 10);
        return basketball;
    }
    const basketball = generateBasketball();
    scene.add(basketball);
    return room;
}
    const room = generateRoom();
    scene.add(room);

    // floor
    function generateFloorMat() {
    const mat = new THREE.Mesh(
        new THREE.BoxGeometry(5, 10, 0.5),
        new THREE.MeshToonMaterial({ color: 0x816b6b })
    );
    mat.material.side = THREE.DoubleSide;
    mat.rotation.x = 11;
    mat.position.set(-32, 1.5, -30);
}

    // NO CODE AFTER THIS
// Renderer must be at the bottom
    function animate() {
    requestAnimationFrame(animate);

    // Required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}
animate();
