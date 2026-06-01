// Random things that we don't want to define twice (mainly square class)
class Square {
    constructor(x, y, occ, b) {
        this.x = x;
        this.y = y;
        this.occ = occ;
        this.b = b;
    }
    setColor(c) {
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
        for (let i of n) {
            if (i.occ == false) {
                n.remove(i);
            }
        }
        return n;
    }
    sames(n,di=false) {
        for (let i of n) {
            if (!di) {
                if (i.occ && i.b == this.b) {
                    continue;
                } else {
                    n.remove(i);
                }
            } else {
                if (i.occ && i.b != this.b) {
                    continue;
                } else {
                    n.remove(i);
                }
            }
        }
        return n;
    }
    surrounded(cells) {
        return this.sames(this.neighbors(cells,false),false).length == 4;
    }
    static findGroup(cells, square) {
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
    static allGroups(cells) {
        let groups = [];
        let newCells = structuredClone(cells);
        for (let i of newCells) {
            if (!i) {
                continue;
            }
            groups.push(findGroup(newCells,i));
        }
        return groups
    }
    static groupSurrounded(cells,group) {
        let surrounded = true;
        for (let i of group) {
            if (i.neighbors(cells,false).length != false) {
                surrounded = false;
                break;
            }
        }
        return surrounded;
    }
    static turnFlipCheck(cells) {
        let groups = allGroups(cells);
        for (let i of groups) {
            if (groupSurrounded(cells,i)) {
                for (let j of i) {
                    j.flip();
                }
            }
        }
    }
    static afterTurnRemoveCheck(cells) {
        let groups = allGroups(cells);
        for (let i of groups) {
            if (groupSurrounded(cells,i)) {
                for (let j of i) {
                    j.setColor(0);
                }
            }
        }
    }
}
export { Square };