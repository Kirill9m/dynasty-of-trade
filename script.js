const canvas = document.getElementById("main-game-window");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.height = 600;
const CANVAS_WIDTH = canvas.width = 600;

const playerImg = new Image();
playerImg.src = "img/shadow_dog.png";
const spriteWidth = 575;
// 6876px width / 12
const spriteHeight = 523;
// 5230px / 10
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrame = 0;
let maxFrameX = 4;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.fillRect(50, 50, 100, 100);
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImg, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if (gameFrame % staggerFrame == 0) {
        if(frameY > 0 && frameY <= 2 || frameY >= 6 && frameY <= 7)
            maxFrameX = 6;
        if(frameY === 3)
            maxFrameX = 8;
        if(frameY === 4)
            maxFrameX = 10;
        if(frameY === 5)
            maxFrameX = 4;
        if(frameY === 8)
            maxFrameX = 11;
        if(frameY === 9)
            maxFrameX = 3;
        if (frameX < maxFrameX) {
            frameX++;
        } else
            frameX = 0;
}
    gameFrame++;
    requestAnimationFrame(animate);
};

const move = document.querySelector(".move_btn");
move.addEventListener("click", (event) => {
    frameY++;
});

const speed = document.querySelector(".shoot_btn");
speed.addEventListener("click", (event) => {
    staggerFrame++;
    if(staggerFrame > 5)
        staggerFrame = 0;
});

animate();