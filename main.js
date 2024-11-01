document.addEventListener("DOMContentLoaded", function() {
    
    const mainGameWindow = document.querySelector("#main-game-window");
    const columns = 20;
    const rows = 10;

    mainGameWindow.style.display = "grid";
    mainGameWindow.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    mainGameWindow.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const cell = document.createElement("div");
            cell.classList.add(`${row}x${col}`);
            cell.classList.add("grid-cell");
            mainGameWindow.appendChild(cell);
        }
    }
});



function getRandomInt(max) {
    Math.floor(Math.random() * max) + 1;
}

function addTree(tree) {

}