const mainGameWindow = document.querySelector("#main-game-window");
    const columns = 20;
    const rows = 10;

    mainGameWindow.style.display = "grid";
    mainGameWindow.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    mainGameWindow.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const cell = document.createElement("div");
            cell.id = (`c${row}r${col}`);
            cell.classList.add("grid-cell");
            mainGameWindow.appendChild(cell);
        }
    }

    function getRandomInt(max) {
       return Math.floor(Math.random() * max) + 1;
    }

    function addTree() {
        const row = getRandomInt(rows);
        const col = getRandomInt(columns);

        const tree = new Image(32, 32);
        tree.src = "img/tree.png";
        rand = (`#c${row}r${col}`);
        const cell = document.querySelector(rand);
        if(!(cell.classList.contains('have-tree'))){
            cell.classList.add("have-tree");
            cell.appendChild(tree);
        }
    }

    for(let i=0; i < 10; i++){
        addTree();
    }