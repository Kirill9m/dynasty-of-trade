    const rows = 16;
    const cols = 32;
    const cellSize = 25;

    
    let playerX = 0;
    let playerY = 0;

    
    let targetX = playerX;
    let targetY = playerY;

    let treeImage;
    let house;
    let player;
    let man;
    let trees = [];
    const maxMoveDistance = 5;

    function preload() {
        treeImage = loadImage('dynasty-of-trade/img/tree.png');
        houseImage = loadImage('dynasty-of-trade/img/house.png');
        manImage = loadImage('dynasty-of-trade/img/man.png');

      }

      function setup() {
        let canvas = createCanvas(cols * cellSize, rows * cellSize);
        canvas.parent('main-game-window');
        const moveBtn = document.querySelector(".move_btn");
        moveBtn.addEventListener('click', movePlayer)

    }  

    function draw() {
      background(60);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          stroke(0);
          noFill();
          rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }

       for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let distance = Math.abs(i - playerX) + Math.abs(j - playerY);

          if (distance <= maxMoveDistance) {
            fill(200, 255, 200);
          } else {
            noFill();
          }

          stroke(0);
          rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }

      for (let tree of trees) {
        image(treeImage, tree.x * cellSize, tree.y * cellSize, cellSize, cellSize);
      }

      fill(255, 100, 100, 150);
      noStroke();
      rect(targetX * cellSize, targetY * cellSize, cellSize, cellSize);

      fill(50, 100, 255);
      image(manImage, playerX * cellSize, playerY * cellSize, cellSize, cellSize);
    }

    function mousePressed() {
      let clickedX = Math.floor(mouseX / cellSize);
      let clickedY = Math.floor(mouseY / cellSize);

      if (clickedX >= 0 && clickedX < cols && clickedY >= 0 && clickedY < rows) {
        targetX = clickedX;
        targetY = clickedY;
      }
    }

    function movePlayer() {
          let distance = Math.abs(targetX - playerX) + Math.abs(targetY - playerY);
  
          if (distance <= maxMoveDistance) {
            playerX = targetX;
            playerY = targetY;
          }
      }

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function cleanMap() {
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const cell = document.querySelector(rand);
            cell.id = (`c${row}r${col}`);
        }
    }
}

const map = document.querySelector(".game_map");
map.addEventListener("click", (event) => {
    for (let i = 0; i < 15; i++) {
        let treeX = floor(random(cols));
        let treeY = floor(random(rows));
        trees.push({ x: treeX, y: treeY });
      }
});