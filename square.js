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
}
export { Square };