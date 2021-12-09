import '../style.css';
import './site-nav.js';
import * as threed from 'three';
import { SiteNav } from './site-nav.js';


const scene = new threed.Scene();
const cam = new threed.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const render = new threed.WebGLRenderer({ canvas: document.querySelector('#bg') });
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);
cam.position.setZ(5);



function addCube() {
    const cubey = new threed.BoxGeometry(.5, .5, .5);
    const greeny = new threed.MeshBasicMaterial({ color: 0x33DD33, wireframe: true });
    const meshy = new threed.Mesh(cubey, greeny);

    const [x, y, z] = Array(3).fill().map(() => threed.MathUtils.randFloatSpread(50));

    meshy.position.set(x, y, z);

    scene.add(meshy);

    return meshy;
}

let boxArray = Array.from({length: 100}, addCube);

console.log(boxArray);
function animate() {
    requestAnimationFrame(animate);
    boxArray.forEach((cubey)=> {cubey.rotation.x += .01;});
    render.render(scene, cam);
}

customElements.define("site-nav", SiteNav)
animate();