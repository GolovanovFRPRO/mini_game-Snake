export class Snake {
    constructor(size) {
        this.size = size;
        this.body = [
            { x: Math.floor(size / 2), y: Math.floor(size / 2) },
            { x: Math.floor(size / 2) - 1, y: Math.floor(size / 2) }
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

        if (head.x >= this.size) head.x = 0;
        if (head.x < 0) head.x = this.size - 1;
        if (head.y >= this.size) head.y = 0;
        if (head.y < 0) head.y = this.size - 1;

        this.body.unshift(head);
        if (!this.grow) this.body.pop();
        this.grow = false;
    }

    setDirection(newDirection) {
        const oppositeDirections = {
            'UP': 'DOWN',
            'DOWN': 'UP',
            'LEFT': 'RIGHT',
            'RIGHT': 'LEFT'
        };
        if (oppositeDirections[this.direction] !== newDirection) {
            this.direction = newDirection;
        }
    }

    isColliding() {
        const head = this.body[0];
        return this.body.slice(1).some(segment => head.x === segment.x && head.y === segment.y);
    }

    expand() {
        this.grow = true;
    }
}