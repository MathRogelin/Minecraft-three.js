import * as THREE from 'three'

const geometria = new THREE.BoxGeometry( 1, 1, 1 ); //aqui define o tamanho de acordo com o sistema 3d
const texturaLoader = new THREE.TextureLoader(); // Carregador de texturas
const texts = ['public/minecraftLogo.webp'] //array de texturas
const textura = texturaLoader.load(texts[0]); // Carregando a textura

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

export function gerarMundo(cena,tamanho){
    for (let x = 0; x < tamanho; x++) {
        for (let z = 0; z < tamanho; z++) {
            const cubo = new THREE.Mesh( geometria, materialtextura ); // juntamos o geometry e material para cria finalmente o cubo
            const altura = Math.floor(Math.random()*3)
            cubo.position.set(x, altura, z)
            cena.add( cubo ); // adicionar o cubo a cena
            
        }
    }
}