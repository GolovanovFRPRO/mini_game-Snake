import { Snake } from './Snake.js';
import { Apple } from './Apple.js';
import { GameBoard } from './GameBoard.js';

export class Game {
    constructor() {
        this.boardSize = 10;
        this.gameBoard = new GameBoard(this.boardSize);
        this.snake = new Snake(this.boardSize);
        this.apple = new Apple(this.boardSize);
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.updateScore();
        this.startGame();
    }

    startGame() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.getElementById('restartButton').addEventListener('click', this.restartGame.bind(this));
        this.startGameLoop();
    }

    handleKeyPress(event) {
        const key = event.key;
        if (key === 'ArrowUp') this.snake.changeDirection('UP');
        if (key === 'ArrowDown') this.snake.changeDirection('DOWN');
        if (key === 'ArrowLeft') this.snake.changeDirection('LEFT');
        if (key === 'ArrowRight') this.snake.changeDirection('RIGHT');
    }

    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.snake.move();
            if (this.snake.checkCollision()) {
                this.endGame();
            } else {
                this.checkAppleCollision();
                this.gameBoard.updateBoard(this.snake, this.apple);
            }
        }, 200);
    }

    checkAppleCollision() {
        const head = this.snake.body[0];
        if (head.x === this.apple.x && head.y === this.apple.y) {
            this.snake.growSnake();
            this.apple.generateNewPosition();
            this.score++;
            this.updateScore();
        }
    }

    updateScore() {
        document.getElementById('currentScore').innerText = this.score;
        document.getElementById('highScore').innerText = this.highScore;
    }

    endGame() {
        clearInterval(this.gameInterval);
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        document.getElementById('restartButton').style.display = 'block';
    }

    restartGame() {
        this.snake = new Snake(this.boardSize);
        this.apple = new Apple(this.boardSize);
        this.score = 0;
        this.updateScore();
        this.gameBoard.updateBoard(this.snake, this.apple);
        this.startGameLoop();
        document.getElementById('restartButton').style.display = 'none';
    }
}