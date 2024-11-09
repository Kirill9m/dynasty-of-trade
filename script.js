import { backgroundLayer1, 
    backgroundLayer2, 
    backgroundLayer3, 
    backgroundLayer4, 
    backgroundLayer5, 
    playerImg,
} from './images.js';

import { Layer, Enemy } from './gameClasses.js';

export { gameFrame };

/** @type {HTMLCanvasElement} */

let playerState = 'run';
window.canvas = document.getElementById("main-game-window");
window.ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const numberOfEmemies = 10;
const enemiesArray = [];

const spriteWidth = 575;
// 6876px width / 12
const spriteHeight = 523;
// 5230px / 10
let gameFrame = 0;
let staggerFrame = 3;
window.gameSpeed = 5;
const spriteAnimations = [];

const slider = document.querySelector(".slider");
slider.value = gameSpeed;
const showGameSpeed = document.querySelector(".game_speed");

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

for(let x = 0; x < numberOfEmemies; x++) {
    enemiesArray.push(new Enemy());
}

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
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImg, frameX, frameY, spriteWidth, spriteHeight, 0, 497, spriteWidth / 6, spriteHeight / 6);
    gameFrame++;
    requestAnimationFrame(animate);
};

const move = document.querySelector(".move_btn");
move.addEventListener("click", (event) => {
    playerState = 'idle';
});

const speed = document.querySelector(".shoot_btn");
speed.addEventListener("click", (event) => {
    if (staggerFrame < 8)
        staggerFrame++;
});

const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
    playerState = e.target.value;
});

slider.addEventListener('change', function (e) {
    console.log(e.target.value);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = 'Gamespeed: ' + gameSpeed;
});

animate();