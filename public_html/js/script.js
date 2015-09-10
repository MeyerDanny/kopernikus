var scene, camera, renderer, light;

var player;
var playerGeometry;
var playerMaterial;

init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);  

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set(0, 1, 1).normalize();
    scene.add(light);
    
    //EventListener bei Veränderung der Fenstergröße
    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
    //PLAYER
    playerGeometry = new THREE.SphereGeometry(0.3, 10, 10);
    playerMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
  
    addPlayer();
}

function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        renderer.setClearColor(0x000000, 1);
}

function addPlayer(){
        player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.z = 2.5;
        scene.add(player);
}


  

