// Random things that we don't want to define twice (mainly square class)
class Square {
    constructor(x, y, occ, b) {
        this.x = x;
        this.y = y;
        this.occ = occ;
        this.b = b;
    }
    set_color(c) {
        if (c == 0) {
            this.occ = false;
            this.b = false;
        } else {
            this.occ = true;
            if (c == 1) {
                this.b = true;
            } else {
                this.b = false;
            }
        }
    }
    flip() {
        if (this.occ) {
            this.b = !this.b;
        }
    }
    get() {
        let c = 0;
        if (this.occ) {
            c = 1;
            if (!this.b) {
                c = 2;
            }
        }
        return c;
    }
    neighbors(cells,d=false) {
        let n = [cells[this.x - 1][this.y], cells[this.x + 1][this.y], cells[this.x][this.y - 1], cells[this.x][this.y + 1]];
        if (d) {
            n.concat([cells[this.x-1][this.y-1], cells[this.x-1][this.y+1], cells[this.x+1][this.y+1], cells[this.x+1][this.y-1]]);
        }
    }
    sames(n) {
        for (let i of n) {
            if (i.occ && i.b == this.b) {
                continue;
            } else {
                n.splice(n.indexOf(i), 1);
            }
        }
        return n;
    }
}
function findGroup(cells, square) {
    let group = new Set();
    function getMatches(cell, l) {
        if (!cell || l.has(cell)) return;
        l.add(cell);
        let neighbors = square.same(square.neighbors(cells, cell));
        for (let neighbor of neighbors) {
            getMatches(neighbor);
        }
    }
    getMatches(square, group);
    for (let cell of group) {
        cells[cell.x][cell.y] = null;
    }

    return Array.from(group);
}
function allGroups(cells) {
    let newCells = structuredClone(cells);
    for (let i of newCells) {
        if (!i) {
            continue;
        }
        findGroup(newCells,i);
    }
}
export { Square };