//setup of canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1500;
canvas.height = 700;
c.fillRect(0,0, canvas.width, canvas.height);



//background layers
const background5 = new Image();
background5.src = './MenuImages/MenuBack.png';
const background4 = new Image();
background4.src = './MenuImages/Menu4.png';
const background3 = new Image();
background3.src = './MenuImages/Menu3.png';
const background2 = new Image();
background2.src = './MenuImages/Menu2.png';
const background1 = new Image();
background1.src = './MenuImages/Menu1.png';

const blimp = new BasicSprite({x: -50, y: 100, imageSrc: "./MenuImages/Blimp.png"});
const trucks = new BasicSprite({x: 1200, y: 545, imageSrc: "./MenuImages/Trucks.png"});
const van = new BasicSprite({x: -200, y: 400, imageSrc: "./MenuImages/Van.png"});

//players
const player1 = new Player({
    x: 100, y: 200, playerNum: 1, imageSrc: 'BotSprite/moveWithoutFXx2.png',  imageSrc2: 'BotSprite/leftSideMovement.png' 
});

const player2 = new Player({
    x: 600, y: 200, playerNum: 2, imageSrc: 'BotSprite/moveWithoutFXx2.png', imageSrc2: 'BotSprite/leftSideMovement.png'
});

const world = new WorldGrid({level:1});

//REMEMBER THIS LEADS TO MENU
let stage = 0;
//player score
let p1Score = 0;
let p2Score = 0;


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    upA: {
        pressed: false
    },
    leftA: {
        pressed: false
    },
    rightA: {
        pressed: false
    }
}


function updateBackground(){
    blimp.x += 0.5;
    trucks.x -= 0.7;
    //van.x += 1;

    if(trucks.x < 500) trucks.x = 1200;
    if(blimp.x > canvas.width + 100) blimp.x = -100;
   // if(van.x > canvas.width + 100) van.x = -100;
}

function drawBackground(){
    c.drawImage(background5,0,0);
    blimp.draw(c);
    c.drawImage(background4,0,0);
    trucks.draw(c);
    c.drawImage(background3,0,0);
    
    c.drawImage(background2,0,0);
    // van.draw(c);
    c.drawImage(background1,0,0);
}

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width, canvas.height);
    //draw blackground / update moving background images
    updateBackground();
    drawBackground();
    world.loadMap(c);
    //update and draw players next
    player1.update(canvas);
    player2.update(canvas);
    player2.draw(c);
    player1.draw(c);
    playerActionOnKey();
}

function playerActionOnKey(){
    player1.xVel = 0;
    player2.xVel = 0;

    if(keys.a.pressed) player1.xVel = -2;
    else if(keys.d.pressed) player1.xVel = 2;

    if(keys.leftA.pressed) player2.xVel = -2;
    else if(keys.rightA.pressed) player2.xVel = 2;

    
}



animate();

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w' : 
            player1.jump();
        break;
        case 'a' :
            keys.a.pressed = true;
            player1.playerState = "left";
            
        break;
        case 'd' :
            player1.playerState = "right";
            keys.d.pressed = true;
        break;
    }

    switch(event.key){
        case 'ArrowUp' :
            player2.jump();
        break;
        case 'ArrowRight' :
            player2.playerState = "right";
            keys.rightA.pressed = true;
        break;
        case 'ArrowLeft' :
            player2.playerState = "left";
            keys.leftA.pressed = true;
        break;
    }
    console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a' :
            player1.playerState = "leftIdle";
            keys.a.pressed = false;
        break;
        case 'd' :
            player1.playerState = "rightIdle";
            keys.d.pressed = false;
        break;
        
    }

    switch(event.key){
        case 'ArrowRight' :
            player2.playerState = "rightIdle";
            keys.rightA.pressed = false;
        break;
        case 'ArrowLeft' :
            keys.leftA.pressed = false;
            player2.playerState = "leftIdle";
        break;
    }
    console.log(event.key);
});
