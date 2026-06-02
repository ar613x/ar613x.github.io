// Random things that we don't want to define twice (mainly square class)
class Square {
    constructor(x, y, occ, b, div) {
        this.x = x;
        this.y = y;
        this.occ = occ;
        this.b = b;
        this.div = div;
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
    neighbors(cells,d=false,h=true,v=true,d1=false) {
        let n = [];
        if (h) {
            n = n.concat([cells[this.y][this.x-1], cells[this.y][this.x+1]]);
        }
        if (v) {
            n = n.concat([cells[this.y-1][this.x], cells[this.y+1][this.x]]);
        }
        if (d) {
            n = n.concat([cells[this.y-1][this.x+1], cells[this.y+1][this.x-1]]);
        }
        if (d1) {
            n = n.concat([cells[this.x-1][this.y-1], cells[this.x+1][this.y+1]])
        }
        n = n.filter(i => i && i.occ);
        return n;
    }
    sames(n,di=false) {
        n = n.filter(i => i && i.occ && di==true ? i.b == this.b : i.b !== this.b);
        return n;
    }
    findGroup(cells) {
        let n = new Set([this]);
        for (let j of n) {
            j.sames(j.neighbors(cells,false,true,true,false)).forEach(k => n.add(k));
        }
    }
    hGroup(cells) {
        let n = new Set([this]);
        for (let j of n) {
            j.sames(j.neighbors(cells,false,true,false,false)).forEach(k => n.add(k));
        }
        return Array.from(n);
    }
    vGroup(cells) {
        let n = new Set([this]);
        for (let j of n) {
            j.sames(j.neighbors(cells,false,false,true,false)).forEach(k => n.add(k));
        }
        return Array.from(n);
    }
    dGroup(cells) {
        let n = new Set([this]);
        for (let j of n) {
            j.sames(j.neighbors(cells,true,false,false,false)).forEach(k => n.add(k));
        }
        return Array.from(n);
    }
    d1Group(cells) {
        let n = new Set([this]);
        for (let j of n) {
            j.sames(j.neighbors(cells,false,false,false,true)).forEach(k => n.add(k));
        }
    }
    surrounded(cells) {
        return this.sames(this.neighbors(cells,false),false).length == 4;
    }
}
// function findGroup(cells, square) {
//     let group = new Set();
//     function getMatches(cell, l) {
//         if (!cell || l.has(cell)) return;
//         l.add(cell);
//         let neighbors = cell.sames(cell.neighbors(cells, false, true, true), false);
//         for (let neighbor of neighbors) {
//             getMatches(neighbor, l);
//         }
//     }
//     getMatches(square, group);
//     for (let cell of group) {
//         cells[cell.x][cell.y] = null;
//     }
//     return Array.from(group);
// }
function allGroups(cells) {
    let groups = [];
    let newCells = structuredClone(cells);
    for (let i of newCells) {
        if (!i) {
            continue;
        }
        groups.push(i.findGroup(cells));
    }
    return groups
}
function groupSurrounded(cells,group) {
    let surrounded = true;
    for (let i of group) {
        if (i.neighbors(cells,false,true,true,false).length !== 4) {
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
    return cell.hGroup(cells).length >=5 || cell.vGroup(cells).length >= 5 || cell.dGroup(cells).length >= 5;
}
function moveWinCheck(cells) {
    let newCells = structuredClone(cells);
    for (let row of newCells) {
        for (let i of row) {
            if (!i) {
                continue;
            }
            if (win(newCells,i)) {
                return true;
                break;
            }
        }
    }
}
export { Square };