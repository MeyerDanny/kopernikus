var scene, camera, renderer, light;

var player;
var playerGeometry;
var playerMaterial;

var star;
var stars = [];
var starMaterial;
var starGeometry;

var obstacle;
var obstacles = [];
var obstacleMaterial;
var obstacleGeometry;

var starInterval = 1;
var obstacleInterval = 1000;
var secondCount = 0;
var speed = 0.1;

var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var playerSpeed;

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
       
    //STARS
    starGeometry = new THREE.SphereGeometry(0.02, 10, 10);
    starMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    
    //OBSTACLES
    obstacleGeometry = new THREE.SphereGeometry(1.5, 10, 10);
    obstacleMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    
    addPlayer();
    addStar();
    addObstacle();
    
    //CONTROLS
    document.addEventListener('keydown', function(event){
        playerSpeed = 0.5;
        goatRotation = 0.05;
        
        switch(event.keyCode){
            case KEYCODE_LEFT:
                player.position.x -= playerSpeed;
                break;
            case KEYCODE_RIGHT:
                player.position.x += playerSpeed;
                break;
            case KEYCODE_UP:
                player.position.y += playerSpeed;
                break;
            case KEYCODE_DOWN:
                player.position.y -= playerSpeed;
                break;
        }
    });

    //Intervall um die Geschwindigkeit der Sterne zu erhöhen
    setInterval(function(){
        secondCount += 1;
    }, 1000);
}

function animate(){
        starBehavior();
        obstacleBehavior();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        renderer.setClearColor(0x000000, 1);
}

function addPlayer(){
        player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.z = 2.5;
        player.material.opacity = 1;
        scene.add(player);
}

function addStar(){
    star = new THREE.Mesh(starGeometry, starMaterial);
    
    star.position.x = Math.random() * 20 - 10;
    star.position.y = Math.random() * 20 - 10;
    star.position.z = -25;
    
    stars.push(star);
    scene.add(star);

    setTimeout(addStar, starInterval);
}

function starBehavior(){
    stars.forEach(function(star){
        star.position.z += speed + secondCount * 0.01;
    });
}

function addObstacle(){
    obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    
    obstacle.position.x = Math.random() * 20 - 10;
    obstacle.position.y = Math.random() * 20 - 10;
    obstacle.position.z = -100; 
  
    obstacles.push(obstacle);
    scene.add(obstacle);
    
    if(obstacleInterval > 50){
        obstacleInterval -= 1;
    }
    
    setTimeout(addObstacle, obstacleInterval);
}

function obstacleBehavior(){
    obstacles.forEach(function(obstacle){
        obstacle.position.z += speed + secondCount * 0.01;
        if(obstacle.position.z > player.position.z){
            scene.remove(obstacle);
        }});
    
}

