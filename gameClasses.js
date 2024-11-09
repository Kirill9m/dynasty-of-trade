import { backgroundLayer1, 
    backgroundLayer2, 
    backgroundLayer3, 
    backgroundLayer4, 
    backgroundLayer5, 
    playerImg,
    } from "./images.js";
import { gameFrame } from "./script.js";

export class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
        // this.x = gameFrame * this.speed % this.width;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'img/enemy1.png';
        // this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = Math.random()*(canvas.width - this.width);
        this.y = Math.random()*(canvas.height - this.height - 120);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += Math.random() * 5 -2.5;
        this.y += Math.random() * 5 - 2.5;
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}