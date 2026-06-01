const board = document.getElementById("board");

const pieceList = [];

class Piece {
    constructor(x, y, element) {
        pieceList.push(this);
        this.x = x;
        this.y = y;
        this.element = element;
    }

    static pieceAt(x, y) {
        for (const piece of pieceList) {
            if (piece.x == x && piece.y == y) {
                return piece;
            }
        }
    }

    getColor() {
        return this.element.className == "solid black" ? "black" : "white";
    }

    setColor(color) {
        this.element.className = (color == "black" ? "solid black" : "solid white");
    }

    getNeighbors(sameColor=false) {
        const right = pieceAt(this.x+1, this.y);
        const left = pieceAt(this.x-1, this.y);
        const up = pieceAt(this.x, this.y-1);
        const down = pieceAt(this.x, this.y+1);
        const neighbors = [right, left, up, down];
        for (const neighbor of neighbors) {
            if (!neighbor) neighbors.remove(neighbor);
            if (sameColor && (neighbor.getColor() != this.getColor())) neighbors.remove(neighbor);
        }
        return neighbors;
    }

    isSurrounded() {
        return this.getNeighbors().length == 4;
    }

    findGroup(foundPieces) {
        // initializing list
        const groupList = [];
        if (!foundPieces) groupList.appendChild(this);

        // add new neighbors
        const neighbors = this.getNeighbors(true);
        neighbors.filter((piece) => {!(piece in foundPieces)});
        for (const neighbor of neighbors) groupList.appendChild(neighbor);

        // count new pieces as found
        for (const piece of groupList) foundPieces.appendChild(piece);

        // add unfound pieces from new neigbors
        for (const neighbor of neighbors) {
            const newNewPieces = neighbor.findGroup(foundPieces);
            for (const newPiece of newNewPieces) {
                groupList.appendChild(newPiece);
                foundPieces.appendChild(newPiece);
            }
        }

        // return new pieces or Group object
        if (foundPieces) return groupList;
        return new Group(groupList);
    }

    flipColor() {
        if (this.getColor() == "white") this.setColor("black");
        else this.setColor("white");
    }

}

class Group {
    constructor(pieces) {
        this.pieces = pieces;
    }

    isSurrounded() {
        for (const piece of this.pieces) {
            if (!piece.isSurrounded()) return false;
        } return true;
    }
}

function flipPieces(secondTime) {
    const needFlipping = [];
    for (const piece of pieceList) {
        if (piece.findGroup().isSurrounded()) {
            if (secondTime) pieceList.remove(piece);
            else needFlipping.appendChild(piece);
        }
    }
    for (const piece of needFlipping) piece.flipColor();
    if (!secondTime) flipPieces(true);
}
export {Piece, Group, flipPieces};
