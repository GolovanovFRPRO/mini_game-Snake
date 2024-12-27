export class GameArea {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.createBoard();
    }

    createBoard() {
        const area = document.getElementById('gameArea');
        if (!area) {
            console.error('Element with id "gameArea" not found');
            return;
        }
        
        area.innerHTML = '';

        for (let i = 0; i < this.size * this.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            area.appendChild(cell);
            this.cells.push(cell);
        }
    }

    render(snake, food) {
        this.cells.forEach(cell => cell.className = 'cell');

        const headIndex = snake.body[0].y * this.size + snake.body[0].x;
        this.cells[headIndex].classList.add('snake-head');

        snake.body.slice(1).forEach(segment => {
            const index = segment.y * this.size + segment.x;
            this.cells[index].classList.add('snake-body');
        });

        const foodIndex = food.y * this.size + food.x;
        this.cells[foodIndex].classList.add('food');
    }
}