import * as THREE from './js/three.module.js';
import {OrbitControls} from './js/OrbitControls'
import {Integrator} from './js/integrator'
import {Body} from './js/body'

let scene, camera, renderer, mesh;

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function createDirectionalLight(){
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    return light;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const canvas = document.querySelector('#cnv');
    renderer = new THREE.WebGLRenderer({canvas});    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(25, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false })
    );

    scene.add(createDirectionalLight())

    scene.add(mesh);

    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    for (var i = 0; i < 10000; i++) {

        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    var particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x888888 }));
    scene.add(particles);

    camera.position.z = 50;

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 50;
    controls.maxDistance = 5000;

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {

    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

}

init();
animate();