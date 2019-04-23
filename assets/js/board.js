class Board {
    
    constructor() {
        this.width = 20;
        this.height = 15;
        this.dimensions = [this.width, this.height];
        this.apple = new Apple();
        this.snake = new Snake();
    }
    
    eatApple() {
        this.snake.eat(this.apple);
        respawnApple();
    }

    restart() {
        this.apple = new Apple();
        this.snake = new Snake();
    }
    
    willSnakeDie() {
        let head = this.snake.head();
        let direction = this.snake.direction;
        return (
            (head[1] === this.dimensions[1] - 1 && direction === Coordinates.SOUTH) ||
            (head[1] === 0 && direction === Coordinates.NORTH) ||
            (head[0] === this.dimensions[0] - 1 && direction === Coordinates.EAST) ||
            (head[0] === 0 && direction === Coordinates.WEST) ||
            (direction === Coordinates.NORTH && this.isCellSnake([head[0], head[1] - 1])) ||
            (direction === Coordinates.SOUTH && this.isCellSnake([head[0], head[1] + 1])) ||
            (direction === Coordinates.WEST && this.isCellSnake([head[0] - 1, head[1]])) ||
            (direction === Coordinates.EAST && this.isCellSnake([head[0] + 1], head[1]))
        );
    }
    
    willSnakeEatApple() {
        return false;
    }
    
    turnSnake(direction) {
        this.snake.turn(direction);
    }
    
    respawnApple() {
        do {
            this.apple.respawn();
        } while (this.isCellSnake(this.apple.position))
    }

    render() {
        const grid = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = $("<div>");
                const position = [j, i];
                cell.addClass('cell');
                if (this.isCellSnake(position)) {
                    cell.addClass('snake');
                } else if (this.isCellApple(position)) {
                    cell.addClass('apple');
                } else if (this.isCellEatenApple(position)) {
                    cell.addClass('eaten-apple');
                } else {
                    cell.addClass('space');
                }
                grid.push(cell);
            }
        }
        return grid;
    }
    
    isCellSnake(position) {
        return this.contains(this.snake.segments, position);
    }
    
    isCellApple(position) {
        return this.equivalent(this.apple.position, position)
    }
    
    isCellEatenApple(position) {
        return false;
    }
    
    move() {
        this.snake.move();
    }
    
    contains(segments, position) {
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            if (this.equivalent(segment, position)) {
                return true;
            }
        }
        return false;
    }

    equivalent(positionA, positionB) {
        if (positionA[0] === positionB[0] && positionA[1] === positionB[1]) {
            return true;
        }
        return false;
    }
}