import { Snake } from './Snake.js';
import { Food } from './Food.js';
import { GameArea } from './GameArea.js';

export class SnakeGame {
    constructor() {
        this.size = 10;
        this.board = new GameArea(this.size);
        this.snake = new Snake(this.size);
        this.food = new Food(this.size);
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.updateScoreDisplay();
        this.initializeGame();
    }

    initializeGame() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.getElementById('restartBtn').addEventListener('click', this.resetGame.bind(this));
        this.gameLoop();
    }

    handleKeyPress(event) {
        const key = event.key;
        if (key === 'ArrowUp') this.snake.setDirection('UP');
        if (key === 'ArrowDown') this.snake.setDirection('DOWN');
        if (key === 'ArrowLeft') this.snake.setDirection('LEFT');
        if (key === 'ArrowRight') this.snake.setDirection('RIGHT');
    }

    gameLoop() {
        this.interval = setInterval(() => {
            this.snake.move();
            if (this.snake.isColliding()) {
                this.endGame();
            } else {
                this.checkFoodCollision();
                this.board.render(this.snake, this.food);
            }
        }, 200);
    }

    checkFoodCollision() {
        const head = this.snake.body[0];
        if (head.x === this.food.x && head.y === this.food.y) {
            this.snake.expand();
            this.food.spawn();
            this.score++;
            this.updateScoreDisplay();
        }
    }

    updateScoreDisplay() {
        document.getElementById('currentScore').innerText = this.score;
        document.getElementById('highScore').innerText = this.highScore;
    }

    endGame() {
        clearInterval(this.interval);
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        document.getElementById('restartBtn').style.display = 'block';
    }

    resetGame() {
        this.snake = new Snake(this.size);
        this.food = new Food(this.size);
        this.score = 0;
        this.updateScoreDisplay();
        this.board.render(this.snake, this.food);
        this.gameLoop();
        document.getElementById('restartBtn').style.display = 'none';
    }
}