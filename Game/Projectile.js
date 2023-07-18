const stepCount = 5;

class Projectile {
    constructor({ x, y, width, height, imageSRC, direction }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageSRC = imageSRC;
        if (imageSRC !== undefined) {
            this.image = new Image();
            this.image.src = imageSRC;
        }
        //either left or right as a string
        this.direction = direction;
    }

    step() {
        if (this.direction == "right") this.x+= stepCount;
        else this.x -= stepCount;
    }

    /**
    * @param {CanvasRenderingContext2D} c
    */
    draw(c){
        if(this.imageSRC === undefined){
            c.fillStyle = "black";
            c.fillRect(this.x, this.y, this.width, this.height);
        } else {
            c.drawImage(this.image, this.x, this.y);
        }
    }

   

}