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
let frameY = 5;
let gameFrame = 0;
let staggerFrame = 15;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrame) % 6;
    frameX = spriteWidth * position;
    ctx.drawImage(playerImg, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
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