// Random things that we don't want to define twice (mainly square class)
class Square {
    constructor(x, y, occ, b) {
        this.x = x;
        this.y = y;
        this.occ = occ;
        this.b = b;
    }
    setColor(c) {
        switch (c) {
            case 0:
                this.occ = false;
                this.b = false;
                break;
            case 1:
                this.occ = true;
                this.b = true;
                break;
            case 2:
                this.occ = true;
                this.b = false;
                break;
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
    neighbors(cells,d=false,h=true,v=true) {
        let n = [];
        if (h) {
            n.concat([cells[this.y][this.x-1], cells[this.y][this.x+1]]);
        }
        if (v) {
            n.concat([cells[this.y-1][this.x], cells[this.y+1][this.x]]);
        }
        if (d) {
            n.concat([cells[this.y-1][this.x-1], cells[this.y-1][this.x+1], cells[this.y+1][this.x+1], cells[this.y+1][this.x-1]]);
        }
        for (let i of n) {
            if (i.occ == false) {
                n.splice(n.indexOf(i),1);
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
                    n.splice(n.indexOf(i),1);
                }
            } else {
                if (i.occ && i.b != this.b) {
                    continue;
                } else {
                    n.splice(n.indexOf(i),1);
                }
            }
        }
        return n;
    }
    hGroup(cells) {
        let n = new Set();
        for (let j of n) {
            j.sames(j.neighbors(cells,false,true,false)).forEach(k => n.add(k));
        }
        return Array.from(n);
    }
    vGroup(cells) {
        let n = new Set();
        for (let j of n) {
            j.sames(j.neighbors(cells,false,false,true)).forEach(k => n.add(k));
        }
        return Array.from(n);
    }
    dGroup(cells) {
        let n = new Set();
        for (let j of n) {
            j.sames(j.neighbors(cells,true,false,false)).forEach(k => n.add(k));
        }
        return Array.from(n);
    }
    surrounded(cells) {
        return this.sames(this.neighbors(cells,false),false).length == 4;
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
function groupSurrounded(cells,group) {
    let surrounded = true;
    for (let i of group) {
        if (i.neighbors(cells,false).length != false) {
            surrounded = false;
            break;
        }
    }
    return surrounded;
}
function turnFlipCheck(cells) {
    let groups = allGroups(cells);
    for (let i of groups) {
        if (groupSurrounded(cells,i)) {
            for (let j of i) {
                j.flip();
            }
        }
    }
}
function afterTurnRemoveCheck(cells) {
    let groups = allGroups(cells);
    for (let i of groups) {
        if (groupSurrounded(cells,i)) {
            for (let j of i) {
                j.setColor(0);
            }
        }
    }
}
function win(cells,cell) {
    return cell.hGroup(cells).length >=5 || cell.vGroup(cells).length >= 5 || cell.dGroup(cells) >= 5;
}
function moveWinCheck(cells) {
    let newCells = structuredClone(cells);
    for (let i of newCells) {
        if (!i) {
            continue;
        }
        if (win(newCells,i)) {
            return true;
            break;
        }
    }
}
export { Square };