class Projectile{
    constructor({x,y,width,height,imageSRC, direction}){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if(imageSRC !== undefined) {
            this.image = new Image();
            this.image.src = imageSRC;
        }
        //either left or right as a string
        this.direction = direction;
    }
}