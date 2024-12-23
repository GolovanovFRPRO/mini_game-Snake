export class Snake {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.body = [
            { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) },
            { x: Math.floor(boardSize / 2) - 1, y: Math.floor(boardSize / 2) }
        ];
        this.direction = 'RIGHT';
        this.grow = false;
    }

    move() {
        const head = { ...this.body[0] };
        if (this.direction === 'RIGHT') head.x++;
        if (this.direction === 'LEFT') head.x--;
        if (this.direction === 'UP') head.y--;
        if (this.direction === 'DOWN') head.y++;

        if (head.x >= this.boardSize) head.x = 0;
        if (head.x < 0) head.x = this.boardSize - 1;
        if (head.y >= this.boardSize) head.y = 0;
        if (head.y < 0) head.y = this.boardSize - 1;

        this.body.unshift(head);
        if (!this.grow) this.body.pop();
        this.grow = false;
    }

    changeDirection(newDirection) {
        const opposites = {
            'UP': 'DOWN',
            'DOWN': 'UP',
            'LEFT': 'RIGHT',
            'RIGHT': 'LEFT'
        };
        if (opposites[this.direction] !== newDirection) {
            this.direction = newDirection;
        }
    }

    checkCollision() {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    growSnake() {
        this.grow = true;
    }
}