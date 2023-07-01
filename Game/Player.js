

const playerState = {
    idleRight: 1,
    idleLeft: 2,
    movingRight: 3,
    movingLeft: 4
}
//constant variables
const PLAYERHEIGHT = 46;
const PLAYERWIDTH = 28;
const PLAYERWIDTH_IMAGE = 41; //2x normal size;
const PLAYERHEIGHT_IMAGE = 46; //2x normal size;
const GRAVITY = 0.35;
const FRAMEHOLD = 10;
const MOVINGFRAMES = 8;
class Player {
 
    constructor ({
        x,
        y, 
        playerNum, 
        imageSrc,  
    }) {
        
        //sprite info
        this.image = new Image();
        this.image.src = String(imageSrc);
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        
        //FALLING PHYSICS
        this.falling = true;
        this.jumping = false;
        //dead
        this.dead = false;        
        //currrent Acceleration & pos for player
        this.x = x;
        this.y = y;
        this.yVel = 0; 
        this.xVel = 0;
        this.playerNum = playerNum;
    }
    /**
    * @param {CanvasRenderingContext2D} c
    */
    draw(c){
        c.drawImage(
            this.image,
            0,
            (this.framesCurrent *  PLAYERHEIGHT_IMAGE) + 1,
            PLAYERWIDTH_IMAGE,
            PLAYERHEIGHT_IMAGE,
            this.x,
            this.y,
            PLAYERWIDTH_IMAGE,
            PLAYERHEIGHT_IMAGE
        );
        c.fillRect(this.x + (PLAYERWIDTH / 3), this.y + 3, 13,14);
        c.fillRect(this.x + (PLAYERWIDTH / 3), this.y + 30, 13,14);
        c.fillRect(this.x + 5, this.y+10, 5,30);
        c.fillRect(this.x + PLAYERWIDTH - 6, this.y+10, 5,30);

        //if(this.touchingTop) c.fillRect(Math.floor((this.x + PLAYERWIDTH/3)/25) * 25, Math.floor((this.y + 3 - 25)/25) * 25,25,25);
    }
    /**
    * @param {HTMLCanvasElement} canvas
    */
    update(canvas){
        this.framesElapsed++;
        if(this.framesElapsed % FRAMEHOLD === 0){
            if(this.framesCurrent < MOVINGFRAMES -1) this.framesCurrent++;
            else this.framesCurrent = 0;
        }

        this.x += this.xVel;
        this.yVel += GRAVITY;
        this.y += this.yVel;
        //touching bottom
        if(this.y + PLAYERHEIGHT  + GRAVITY >= canvas.height){
            this.yVel = 0;
            this.y = canvas.height - PLAYERHEIGHT;
        } 
            
    }

    //move in directions
    fall(){
        if(this.falling){
            this.y += this.yVel;
            this.yVel += Player.GRAVITY;
            if(this.yVel >= 6) this.yVel = 6;
        }
    }
    
    
    jump(){
        if(!this.jumping){
        this.yVel = -7;
        this.y += + this.yVel;
        }
    }
    
    //update and adjust collisions for all 4 sides
    updateCollisionWithTiles(){
        
    }
    // c.fillRect(this.x + PLAYERWIDTH - 6, this.y+10, 5,30);
    topCollision(){
        let tileX = Math.floor((this.x + PLAYERWIDTH - 6) / 25) * 25;
        let tileY = Math.floor((this.y + 3)/25) * 25;
        if(this.collision()) {}
    }
    /**
     * collision between 2 rectangles
     */
    collision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h){
         // are the sides of one rectangle touching the other?

        if (r1x + r1w >= r2x &&    // r1 right edge past r2 left
            r1x <= r2x + r2w &&    // r1 left edge past r2 right
            r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
            r1y <= r2y + r2h) {    // r1 bottom edge past r2 top
            return true;
        }
        return false;
    }
    
}