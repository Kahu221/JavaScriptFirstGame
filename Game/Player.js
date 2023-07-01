

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
    }
    /**
    * @param {HTMLCanvasElement} canvas
    */
    update(canvas){
        this.updateCollisionWithTiles(c);
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
    updateCollisionWithTiles(c){
        this.topCollision(c);
        this.rightCollision(c);
        this.leftCollision(c);
        this.bottomCollision(c);
    }
   
    //right side collision check and adjustments
    rightCollision(c){
        //right hit box values
        let rightX = this.x + PLAYERWIDTH - 6;
        let rightY = this.y+10;
        let rightW = 5;
        let rightH = 30;
        //tile to check values
        let tileXPos = Math.floor((rightX) / TILESIZE);
        let tileYPos = Math.floor(rightY/ TILESIZE);
        let tileX = tileXPos * TILESIZE;
        let tileY = tileYPos * TILESIZE;
        let tileY2 = (tileYPos + 1) * TILESIZE;
        //current Tile that is being checked
        // c.fillStyle = 'red';
        // c.fillRect(tileX,tileY,TILESIZE,TILESIZE);
        if(tileXPos >= 60 || tileYPos >= 28) return false;
        if((map1[tileYPos][tileXPos] != 0) && this.collision(rightX,rightY,rightW,rightH,tileX,tileY,TILESIZE,TILESIZE)) {
            this.xVel = 0;
            this.x = tileX - 23;
            return true;
        }
        else if((map1[tileYPos + 1][tileXPos] != 0) && this.collision(rightX,rightY,rightW,rightH,tileX,tileY2,TILESIZE,TILESIZE)) {
            this.xVel = 0;
            this.x = tileX - 23;
            return true;
        }
        return false;
    }

    //left collision check and adjustments
    leftCollision(c){
        let leftX = this.x + 5;
        let leftY = this.y + 10;
        let leftW = 5;
        let leftH = 30;
        //tile to check values
        let tileXPos = Math.floor((leftX) / TILESIZE);
        
        let tileYPos = Math.floor(leftY/ TILESIZE);
        let tileX = tileXPos * TILESIZE;
        let tileY = tileYPos * TILESIZE;
        //checking the tile below the one above
        let tileY2 = (tileYPos + 1) * TILESIZE;
        //current Tile that is being checked
        // c.fillStyle = 'red';
        // c.fillRect(tileX,tileY,TILESIZE,TILESIZE);
        if(tileXPos >= 60 || tileYPos >= 28) return false;
        if((map1[tileYPos][tileXPos] != 0) && this.collision(leftX,leftY,leftW,leftH,tileX,tileY,TILESIZE,TILESIZE)) {
            this.xVel = 0;
            this.x = tileX + 21;
            return true;
        }
        else if((map1[tileYPos + 1][tileXPos] != 0) && this.collision(leftX,leftY,leftW,leftH,tileX,tileY2,TILESIZE,TILESIZE)) {
            this.xVel = 0;
            this.x = tileX + 21;
            return true;
        }
        return false;
    }
    

    /**
     * collision check witht he bottom hit box
     * @param {*} c canavs to draw on 
     * @returns boolean if the bottom hit box is touching a tile with a non zero value
     */
    //TODO fix the math in this method as it makes no sense the hit box drawn does not add up with the 
    // used for the hitbox implemented here
    bottomCollision(c){
        let bottomX = this.x + (PLAYERWIDTH / 3);
        let bottomY = this.y + 30;
        let bottomW = 13;
        let bottomH = 14;
        //tile to check values
        let tileXPos = Math.floor((bottomX) / TILESIZE);
        let tileYPos = Math.ceil(bottomY/ TILESIZE);
        let tileX = tileXPos * TILESIZE;
        let tileY = tileYPos * TILESIZE;
        //current Tile that is being checked
        // c.fillStyle = 'red';
        // c.fillRect(tileX,tileY,25,25);
        if(tileXPos >= 60 || tileYPos >= 28) return false;
        if((map1[tileYPos][tileXPos] != 0) && this.collision(bottomX,bottomY,bottomW,bottomH,tileX,tileY,TILESIZE,TILESIZE)) {
            this.yVel = 0;
            //must find a fix for this awful + 2
            this.y = tileY - PLAYERHEIGHT + 2;
            return true;
        }
        return false;
    }
    //c.fillRect(this.x + (PLAYERWIDTH / 3), this.y + 3, 13,14);
    topCollision(c){
        let bottomX = this.x + (PLAYERWIDTH / 3);
        let bottomY = this.y + 3;
        let bottomW = 13;
        let bottomH = 14;
        //tile to check values
        let tileXPos = Math.floor((bottomX) / TILESIZE);
        let tileYPos = Math.floor(bottomY/ TILESIZE);
        let tileX = tileXPos * TILESIZE;
        let tileY = tileYPos * TILESIZE;
        //current Tile that is being checked
        // c.fillStyle = 'red';
        // c.fillRect(tileX,tileY,25,25);
        if(tileXPos >= 60 || tileYPos >= 28) return false;
        if((map1[tileYPos][tileXPos] != 0) && this.collision(bottomX,bottomY,bottomW,bottomH,tileX,tileY,TILESIZE,TILESIZE)) {
            this.yVel = 0;
            //must find a fix for this awful + 2
            this.y = tileY + TILESIZE;
            return true;
        }
        return false;
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