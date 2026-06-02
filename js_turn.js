import {Square} from "./square.js";
import {Piece, flipPieces} from "./piece.js";
const board = document.getElementById("board");

let lastCell = null;
let sturn = 0; // 0 = black, 1 = white
function updateTurnMarker() {
    let turnMarker = document.getElementById('turnmarker')
    if (sturn === 0) {
        turnMarker.innerHTML =
            "<span style='color:white;background:black;padding:4px;font-family:monospace;'>Black's turn</span>";
    } else if (sturn === 1) {
        turnMarker.innerHTML =
            "<span style='color:black;background:white;padding:4px;border:1px solid black;font:monospace;'>White's turn</span>";
    }
}
function markLastMove(cell) {
    if (lastCell) {
        lastCell.classList.remove("last-move");
    }

    cell.classList.add("last-move");
    lastCell = cell;
}
let cells = [];
for (let row = 0; row < 19; row++) {
    cells[row] = [];
    for (let col = 0; col < 19; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cells[row][col] = new Square(row, col, false, false, cell);

        cell.id = `${row},${col}`;
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
        cell.addEventListener("updateCell", (event) => {
            const stone = cell.querySelector(".stone");
            if (!stone) {
                stone = document.createElement("div");
            }
            const color = event.detail.color;
            if (!color) {
                cell.removeChild(stone);
            } else if (color == 1) {
                stone.className = "stone black";
            } else if (color == 2) {
                stone.className = "stone white";
            }
        });
        cell.addEventListener("click", () => {
            if (event.detail.id !== cell.id) {
                return;
            }
            const stone = cell.querySelector(".stone");
            const square = cells[row][col];

            if (stone) {
                return;
            }
            if (sturn == 0) {
                const s = document.createElement("div");
                new Piece(row, col, s);
                square.occ = true;
                square.b = true;
                s.className = "stone black";
                cell.appendChild(s);
                sturn += 1;
            } else {
                const s = document.createElement("div");
                new Piece(row, col, s);
                square.occ = true;
                square.b = false;
                s.className = "stone white";
                cell.appendChild(s);
                sturn -= 1;
            }

            markLastMove(cell);
            flipPieces();
            updateTurnMarker();
        });

        board.appendChild(cell);
    }
}
updateTurnMarker();
