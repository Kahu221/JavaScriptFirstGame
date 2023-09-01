//setup of canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const canvasWidth = 1500;
const canvasHeight = 700;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
c.fillRect(0,0, canvas.width, canvas.height);
// 0 = menu screen, 1 = keys screen, 2 = map1, 3 = player has won 
let mapState = 0;
//mouse movement for button hover
let mouseX = 0;
let mouseY = 0;
const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };
window.addEventListener('mousemove', (event) => {
    if(event != undefined){
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
});

//background layer assets
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
const blackShade = new Image();
blackShade.src = './MenuImages/blackShade.png';
//menu layer assest
const title = new Image();
title.src = './MenuImages/Title.png';
const ButtonSheet = new Image();
ButtonSheet.src = './MenuImages/Buttons.png';
const controls = new Image();
controls.src = './MenuImages/controls.png';
const blimp = new BasicSprite({x: -50, y: 100, imageSrc: "./MenuImages/Blimp.png"});
const trucks = new BasicSprite({x: 1200, y: 545, imageSrc: "./MenuImages/Trucks.png"});
const van = new BasicSprite({x: -200, y: 400, imageSrc: "./MenuImages/Van.png"});

//players
const player1 = new Player({
    x: 100, y: 200, playerNum: 1, imageSrc: 'BotSprite/moveWithoutFXx2.png',  imageSrc2: 'BotSprite/leftSideMovement.png' 
});

const player2 = new Player({
    x: 1200, y: 200, playerNum: 2, imageSrc: 'BotSprite/moveWithoutFXx2.png', imageSrc2: 'BotSprite/leftSideMovement.png'
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
    van.x += 1;

    if(trucks.x < 300) trucks.x = 1200;
    if(blimp.x > canvas.width + 100) blimp.x = -100;
   // if(van.x > canvas.width + 100) van.x = -100;
}

function drawMainMenu(){
    let buttonHeight = 97;
    let buttonWidth = 200;
    c.drawImage(background5,0,0);
    blimp.draw(c);
    c.drawImage(background4,0,0);
    trucks.draw(c);
    c.drawImage(background3,0,0);
    c.drawImage(background2,0,0);
    van.draw(c);
    c.drawImage(background1,0,0);
    if(mapState === 1){
        c.drawImage(blackShade,0,0);
        c.drawImage(controls,600,50);
       if(collision(mouseX,mouseY,1,1,300,canvasHeight/2 - 30, buttonWidth,buttonHeight)){
        onmouseup = (event) => mapState = 0;
        c.drawImage(ButtonSheet,buttonWidth,buttonHeight*2,buttonWidth,buttonHeight,300,canvasHeight/2 - 30,buttonWidth,buttonHeight);
       } else {
        c.drawImage(ButtonSheet,0,buttonHeight*2,buttonWidth,buttonHeight,300,canvasHeight/2 - 30,buttonWidth,buttonHeight);
       }
       return;
    }
    
    c.drawImage(title,canvasWidth/2 - 300,canvasHeight/2 - 120);
    
    if(collision(mouseX,mouseY,1,1,(canvasWidth/2) - 90, canvasHeight/2, buttonWidth,buttonHeight)){
        onmouseup = (event) => mapState = 2;
        c.drawImage(ButtonSheet,buttonWidth,0,buttonWidth,buttonHeight,(canvasWidth/2) - 90,canvasHeight/2,buttonWidth,buttonHeight);
    } else {
        c.drawImage(ButtonSheet,0,0,buttonWidth,buttonHeight,(canvasWidth/2) - 90,canvasHeight/2,buttonWidth,buttonHeight);
    }
    //keys
    if(collision(mouseX,mouseY,1,1,(canvasWidth/2) - 90, (canvasHeight/2) + buttonHeight + 20, buttonWidth,buttonHeight)){
        c.drawImage(ButtonSheet,buttonWidth,buttonHeight,buttonWidth,buttonHeight,(canvasWidth/2) - 90,(canvasHeight/2) + buttonHeight + 20,buttonWidth,buttonHeight);
        onmouseup = (event) => mapState = 1;
    } else{
        c.drawImage(ButtonSheet,0,buttonHeight,buttonWidth,buttonHeight,(canvasWidth/2) - 90,(canvasHeight/2) + buttonHeight + 20,buttonWidth,buttonHeight);
    }
}

function hasWon(p){
    
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

function firstMap(){
    //loadMap
    drawBackground();
    world.loadMap(c);
    //check win and update conditions
    if(player1.dead){
        p2Score++;
    }
    if(player2.dead) {
        p1Score++;
    }
    //update and draw players next
    player1.update(canvas);
    player2.update(canvas);
    player2.draw(c);
    player1.draw(c);
    //check for key input
    playerActionOnKey();
    //bullet collision with map
    tileCollisionOnBullets(player1);
    tileCollisionOnBullets(player2);
    //bullet collision to each player
    bulletCollisionWithPlayers(player1,player2);
    bulletCollisionWithPlayers(player2,player1);
}

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width, canvas.height);
    //draw blackground / update moving background images
    updateBackground();
    switch(mapState){
        case 0:
        case 1:
            drawMainMenu();
        break;
        case 2 :
            firstMap();
        break;
        default :
            throw new Error("Issue with map state");
    }
    
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

/**
 * checks all current bullets of a player, if current bullet is colliding with a non zero tile, change tile and then remove the bullet
 * @param {*} p player to pass
 */
function tileCollisionOnBullets(p){
    let toRemove = [];

    p.projectiles.forEach(bullet => {
        let bulletXIndex = Math.floor(bullet.x / 25);
        let bulletYIndex = Math.floor(bullet.y / 25);
        //c.fillRect(bulletXIndex*25, bulletYIndex*25, 25,25);
        
        if(map1[bulletYIndex][bulletXIndex] !== 0){
            map1[bulletYIndex][bulletXIndex] = 0;
            toRemove.push(p.projectiles.indexOf(bullet));  
        } 
        //bullets out of bounds
        if(bullet.x > canvasWidth || bullet.x < 0 || bullet.y > canvasHeight || bullet.y < 0) toRemove.push(p.projectiles.indexOf(bullet))
    });   
    
    p.removeBullets(toRemove);
}

function bulletCollisionWithPlayers(p,p2){
    p.projectiles.forEach(bullet => {
        if(p2.collision(p2.x, p2.y, PLAYERWIDTH, PLAYERHEIGHT, bullet.x, bullet.y, bullet.width, bullet.height)) p2.dead = true;
    })
}


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
        case 't' :
            player1.shoot();
        break;
        case '/' :
            player2.shoot();
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
//must figure out better way to do this as player also has this
function collision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    if (r1x + r1w >= r2x &&    // r1 right edge past r2 left
        r1x <= r2x + r2w &&    // r1 left edge past r2 right
        r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
        r1y <= r2y + r2h) {    // r1 bottom edge past r2 top
        return true;
    }
    return false;
}


