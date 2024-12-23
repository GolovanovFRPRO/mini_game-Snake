export class Apple {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.generateNewPosition();
    }

    generateNewPosition() {
        this.x = Math.floor(Math.random() * this.boardSize);
        this.y = Math.floor(Math.random() * this.boardSize);
    }
}