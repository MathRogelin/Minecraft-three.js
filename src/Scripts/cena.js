import * as THREE from 'three'; // importa biblioteca

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importando o OrbitControls

const scene = new THREE.Scene(); // criar cena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // criar camera

const renderer = new THREE.WebGLRenderer(); //criando o renderizador para camera e cena
renderer.setSize( window.innerWidth/1.05, window.innerHeight/1.05); // tamanho do renderizador
document.body.appendChild( renderer.domElement ); // adicionar renderizador ao body ("corpo"  do html)
// Criando o OrbitControls e passando a câmera e o elemento do renderizador
const controles = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); //aqui define o tamanho de acordo com o sistema 3d
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //cria o mesh/material do objeto
const cube = new THREE.Mesh( geometry, material ); // juntamos o geometry e material para cria finalmente o cubo
scene.add( cube ); // adicionar o cubo a cena

camera.position.z = 5; // distancia inicial

// função para chamar tudo
function cenario() {
	controles.update(); 
	// renderizar cena e camera
	renderer.render( scene, camera );
}

renderer.setAnimationLoop( cenario );