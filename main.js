const rows = 16;
const cols = 32;
const cellSize = 25;

let playerX = 0;
let playerY = 0;

let targetX = playerX;
let targetY = playerY;

let treeImage;
let houseImage;
let manImage;
let trees = [];
const maxMoveDistance = 5; // Максимальная дистанция перемещения
const shootRange = 30; // Дальность выстрела
const moveDelay = 800; // Задержка между перемещениями
const shootDelay = 800; // Задержка между выстрелами
let moveInterval; // Интервал для перемещения
let timerInterval; // Интервал для таймера
let timeLeft = 5; // Время на движение
let moveScheduled = false; // Флаг для проверки, запланировано ли движение
let shots = []; // Массив для хранения координат выстрелов

function preload() {
    treeImage = loadImage('img/tree.png');
    houseImage = loadImage('img/house.png');
    manImage = loadImage('img/man.png');
}

function setup() {
    let canvas = createCanvas(cols * cellSize, rows * cellSize);
    canvas.parent('main-game-window');
    const moveBtn = document.querySelector(".move_btn");
    moveBtn.addEventListener('click', scheduleMove);
    const shootBtn = document.querySelector(".shoot_btn");
    shootBtn.addEventListener('click', scheduleShoot);
    
    // Обработчики для мыши и касания
    canvas.mousePressed(handleMousePressed);
    canvas.touchStarted(handleTouchStarted);
}

function draw() {
    background(60);

    // Рисуем сетку
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            stroke(0);
            noFill();
            rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }

    // Обозначаем клетки, куда может переместиться игрок
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

    // Рисуем деревья
    for (let tree of trees) {
        image(treeImage, tree.x * cellSize, tree.y * cellSize, cellSize, cellSize);
    }

    fill(255, 100, 100, 150);
    noStroke();
    rect(targetX * cellSize, targetY * cellSize, cellSize, cellSize);

    fill(50, 100, 255);
    image(manImage, playerX * cellSize, playerY * cellSize, cellSize, cellSize);

    // Рисуем черные следы выстрелов
    for (let shot of shots) {
        fill(0); // Черный цвет
        noStroke();
        rect(shot.x * cellSize, shot.y * cellSize, cellSize, cellSize);
    }
}

function handleMousePressed() {
    // Левый клик - установка цели для перемещения игрока
    if (mouseButton === LEFT) {
        setTargetPosition();
    }
}

function handleTouchStarted() {
    // Обработка касания - установка цели для перемещения игрока
    setTargetPosition();
    return false; // Предотвращение дальнейшей обработки события
}

function setTargetPosition() {
    let clickedX = Math.floor(mouseX / cellSize);
    let clickedY = Math.floor(mouseY / cellSize);

    if (clickedX >= 0 && clickedX < cols && clickedY >= 0 && clickedY < rows) {
        targetX = clickedX;
        targetY = clickedY;
    }
}

// Функция планирования движения
function scheduleMove() {
    // Очищаем предыдущий интервал, если он есть
    if (moveInterval) {
        clearInterval(moveInterval);
    }

    // Если движение уже запланировано, ничего не делаем
    if (moveScheduled) return;

    // Запускаем таймер
    startTimer();

    moveScheduled = true; // Устанавливаем флаг, что движение запланировано
}

// Запускаем таймер
function startTimer() {
    timeLeft = 5; // Устанавливаем начальное время
    document.getElementById('timer').innerText = timeLeft; // Отображаем время на экране

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft; // Обновляем таймер

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            startMoving(); // Начинаем движение после истечения времени
            moveScheduled = false; // Сбрасываем флаг
        }
    }, 1000); // Каждую секунду
}

// Начинаем движение к целевой клетке
function startMoving() {
    moveInterval = setInterval(movePlayer, moveDelay); // Устанавливаем интервал движения
}

// Перемещение игрока по одной клетке
function movePlayer() {
    // Вычисляем разницу между текущей позицией игрока и целевой
    let dx = targetX - playerX;
    let dy = targetY - playerY;

    // Перемещаемся по одной клетке
    if (Math.abs(dx) > Math.abs(dy)) {
        // Перемещение по оси X
        if (dx > 0) {
            playerX++;
        } else {
            playerX--;
        }
    } else {
        // Перемещение по оси Y
        if (dy > 0) {
            playerY++;
        } else {
            playerY--;
        }
    }

    // Проверяем, достигли ли мы целевой клетки
    if (playerX === targetX && playerY === targetY) {
        // Если достигли, останавливаем движение
        clearInterval(moveInterval);
        moveInterval = null; // Сбрасываем интервал
    }
}

function scheduleShoot() {
    setTimeout(shootPlayer, shootDelay);
}

function shootPlayer() {
    // Добавляем координаты выстрела в массив shots
    shots.push({ x: targetX, y: targetY });
    shoot(targetX * cellSize + cellSize / 2, targetY * cellSize + cellSize / 2);
}

function shoot(mouseX, mouseY) {
    let shootX = Math.floor(mouseX / cellSize);
    let shootY = Math.floor(mouseY / cellSize);

    let distance = Math.abs(shootX - playerX) + Math.abs(shootY - playerY);

    if (distance <= shootRange) {
        fill(255, 0, 0, 150);
        noStroke();
        rect(shootX * cellSize, shootY * cellSize, cellSize, cellSize);
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
