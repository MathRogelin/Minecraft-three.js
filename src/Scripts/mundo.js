import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Noise } from 'noisejs'; // Importando o noise.js
// stats(estático) ajudra a cpu a processar melhor cada bloco com textura, pois são muitos
export const stats = new Stats()
document.body.appendChild(stats.dom)

const geometria = new THREE.BoxGeometry( 1, 1, 1 ); //aqui define o tamanho de acordo com o sistema 3d
const texturaLoader = new THREE.TextureLoader(); // Carregador de texturas
const textura = texturaLoader.load('public/grama.jpeg'); // Carregando a textura

const materialtextura = new THREE.MeshStandardMaterial({ map: textura }); //cria o mesh/material do objeto

export function luzesCena(cena){
    // um ponto de luz
    const luz1 = new THREE.DirectionalLight()
    luz1.position.set(1,2,1)
    cena.add(luz1)
    // outro ponto de luz
    const luz2 = new THREE.DirectionalLight()
    luz2.position.set(-1,2,-0.5)
    cena.add(luz2)
    // como elas são filhar do ambientLight, eu chamo o ambientLight e coloco na cena
    const ambienteLuz = new THREE.AmbientLight()
    // intensidade dsa lu
    ambienteLuz.intensity = 0.1
    cena.add(ambienteLuz)	
}
// Definindo as texturas para as camadas
const texturaGrama = texturaLoader.load('public/grama.jpeg');
const texturaTerra = texturaLoader.load('public/terra.webp');
const texturaRochas = texturaLoader.load('public/pedra.webp');

// Definindo os materiais para cada tipo de camada
const materialGrama = new THREE.MeshStandardMaterial({ map: texturaGrama });
const materialTerra = new THREE.MeshStandardMaterial({ map: texturaTerra });
const materialRochas = new THREE.MeshStandardMaterial({ map: texturaRochas });

const noise = new Noise(Math.random())

export function gerarMundo(cena, tamanho) {
    for (let x = 0; x < tamanho; x++) {
        for (let z = 0; z < tamanho; z++) {
            // Definição da altura com relevo mais natural
            const altura = Math.floor((noise.perlin2(x * 0.1, z * 0.1) + 1) * tamanho/5); 

            // Loop para construir as camadas de material
            for (let y = 0; y < altura; y++) {
                let tipoMaterial = materialTerra; // Padrão para a camada de terra

                // Definir o material de acordo com a camada
                if (y < altura / 3) {
                    tipoMaterial = materialRochas; // Camada mais profunda com rochas
                } else if (y >= altura - 2) {
                    tipoMaterial = materialGrama; // Camada superior com grama
                } else {
                    tipoMaterial = materialTerra; // Camada intermediária com terra
                }

                // Cria o cubo para o terreno com o material adequado
                const cubo = new THREE.Mesh(geometria, tipoMaterial);
                cubo.position.set(x, y, z);
                cena.add(cubo);
            }
        }
    }
}
