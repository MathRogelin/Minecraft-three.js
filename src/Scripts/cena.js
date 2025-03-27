import * as THREE from 'three'; // importa biblioteca
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importando o OrbitControls
import {gerarMundo,luzesCena} from '../Scripts/mundo.js'
import {stats} from '../Scripts/mundo.js'

const cena = new THREE.Scene(); // criar cena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // criar camera

const renderizador = new THREE.WebGLRenderer(); //criando o renderizador para camera e cena
renderizador.setSize( window.innerWidth, window.innerHeight); // tamanho do renderizador
renderizador.setClearColor(0x80a0c0)
document.body.appendChild( renderizador.domElement ); // adicionar renderizador ao body ("corpo"  do html)

// Criando o OrbitControls e passando a câmera e o elemento do renderizador
const controles = new OrbitControls(camera, renderizador.domElement);

camera.position.set(-32,16,-32)// distancia inicial
controles.target.set(16, 0, 16)
controles.update();
// função para chamar cena
function cenario() {
	stats.update() 
	stats.begin()
	// renderizar cena e camera
	renderizador.render( cena, camera );
	stats.end()
}

gerarMundo(cena,32)
luzesCena(cena)
renderizador.setAnimationLoop( cenario );