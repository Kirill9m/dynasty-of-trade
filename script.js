let playerState = 'sit';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
});

const canvas = document.getElementById("main-game-window");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const playerImg = new Image();
playerImg.src = "img/shadow_dog.png";
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/layer-5.png';
const spriteWidth = 575;
// 6876px width / 12
const spriteHeight = 523;
// 5230px / 10
let gameFrame = 0;
let staggerFrame = 3;
let gameSpeed = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

let x = 0;
let x2 = 2400;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4, x, 0);
    ctx.drawImage(backgroundLayer4, x2, 0);
    if(x < -2400) x = 2400 + x2 - gameSpeed;
    else x -= gameSpeed;
    if(x2 < -2400) x2 = 2400 + x - gameSpeed;
    else x2 -= gameSpeed;
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations[playerState].loc.length;
    frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImg, frameX, frameY, spriteWidth, spriteHeight, -30, 100, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
};

const move = document.querySelector(".move_btn");
move.addEventListener("click", (event) => {
    playerState = 'idle';
});

const speed = document.querySelector(".shoot_btn");
speed.addEventListener("click", (event) => {
    if(staggerFrame < 8)
        staggerFrame++;
});

animate();