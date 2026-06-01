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
    neighbors(cells) {
        return [cells[this.x - 1][this.y], cells[this.x + 1][this.y], cells[this.x][this.y - 1], cells[this.x][this.y + 1]];
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
    diagNeighbors(cells) {
        return [cells[this.x-1][this.y-1], cells[this.x-1][this.y], cells[this.x-1][this.y+1], cells[this.x][this.y-1], cells[this.x][this.y+1], cells[this.x+1][this.y-1], cells[this.x+1][this.y], cells[this.x+1][this.y+1]];
    }
}
export { Square };