export class Food {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(Math.random() * this.boardSize);
        this.y = Math.floor(Math.random() * this.boardSize);
    }
}