export class GameBoard {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.initBoard();
    }

    initBoard() {
        const board = document.getElementById('gameBoard');
        board.innerHTML = '';
        for (let i = 0; i < this.size * this.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
            this.cells.push(cell);
        }
    }

    updateBoard(snake, apple) {
        this.cells.forEach(cell => cell.className = 'cell');
        
        const headIndex = snake.body[0].y * this.size + snake.body[0].x;
        this.cells[headIndex].classList.add('snake-head');
        
        snake.body.slice(1).forEach(segment => {
            const index = segment.y * this.size + segment.x;
            this.cells[index].classList.add('snake');
        });
        
        const appleIndex = apple.y * this.size + apple.x;
        this.cells[appleIndex].classList.add('apple');
    }
}