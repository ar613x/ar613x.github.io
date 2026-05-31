const board = document.getElementById("board");

let lastCell = null;
let sturn = 0; // 0 = black, 1 = white
function markLastMove(cell) {
    if (lastCell) {
        lastCell.classList.remove("last-move");
    }

    cell.classList.add("last-move");
    lastCell = cell;
}

for (let i = 0; i < 19 * 19; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    const row = Math.floor(i / 19);
    const col = i % 19;
    cell.id = `cell-${row}-${col}`;
    // Outline the center 7×7 area
    if (row >= 6 && row <= 12) {
        if (col === 6) cell.classList.add("center-left");
        if (col === 12) cell.classList.add("center-right");
    }

    if (col >= 6 && col <= 12) {
        if (row === 6) cell.classList.add("center-top");
        if (row === 12) cell.classList.add("center-bottom");
    }
    
    // Outline the center 3×3 area
    if (row >= 8 && row <= 10) {
        if (col === 8) cell.classList.add("center-left");
        if (col === 10) cell.classList.add("center-right");
    }

    if (col >= 8 && col <= 10) {
        if (row === 8) cell.classList.add("center-top");
        if (row === 10) cell.classList.add("center-bottom");
    }

    let clickTimer = null;

    cell.addEventListener("click", () => {
        clearTimeout(clickTimer);

        clickTimer = setTimeout(() => {
            const stone = cell.querySelector(".stone");

            if (stone) {
                stone.remove();

                if (cell === lastCell) {
                    cell.classList.remove("last-move");
                    lastCell = null;
                }

                return;
            }
            if (sturn == 0) {
                const s = document.createElement("div");
                s.className = "stone black";
                cell.appendChild(s);
                sturn = 1;
            } else {
                const s = document.createElement("div");
                s.className = "stone white";
                cell.appendChild(s);
                sturn = 0;
            }

            markLastMove(cell);
        }, 200);
    });

    board.appendChild(cell);
}
