//setup of canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1500;
canvas.height = 700;
c.fillRect(0,0, canvas.width, canvas.height);


//background objects
const background5 = new Image();
background5.src = '/MenuImages/MenuBack.png';
const background4 = new Image();
background4.src = '/MenuImages/Menu4.png';
const background3 = new Image();
background3.src = '/MenuImages/Menu3.png';
const background2 = new Image();
background2.src = '/MenuImages/Menu2.png';
const background1 = new Image();
background1.src = '/MenuImages/Menu1.png';

//players
const player1 = new Player({
    x: 100, y: 200, playerNum: 1, imageSrc: 'BotSprite/moveWithoutFXx2.png', 
});

const player2 = new Player({
    x: 600, y: 200, playerNum: 2, imageSrc: 'BotSprite/moveWithoutFXx2.png', 
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

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width, canvas.height);
    //draw blackground
    c.drawImage(background5,0,0);
    c.drawImage(background4,0,0);
    c.drawImage(background3,0,0);
    c.drawImage(background2,0,0);
    c.drawImage(background1,0,0);
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
            //keys.w.pressed = true;
        break;
        case 'a' :
            keys.a.pressed = true;
        break;
        case 'd' :
            keys.d.pressed = true;
        break;
    }

    switch(event.key){
        case 'ArrowUp' :
            player2.jump();
            keys.upA.pressed = true;
        break;
        case 'ArrowRight' :
            keys.rightA.pressed = true;
        break;
        case 'ArrowLeft' :
            keys.leftA.pressed = true;
        break;
    }
    console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'w' : 
            //player1.jump();
            //keys.w.pressed = false;
        break;
        case 'a' :
            keys.a.pressed = false;
        break;
        case 'd' :
            keys.d.pressed = false;
        break;
        
    }

    switch(event.key){
        case 'ArrowUp' :
            // player2.jump();
            // keys.upA.pressed = false;
        break;
        case 'ArrowRight' :
            keys.rightA.pressed = false;
        break;
        case 'ArrowLeft' :
            keys.leftA.pressed = false;
        break;
    }
    console.log(event.key);
});
