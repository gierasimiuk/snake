class Board {
    
    constructor() {
        this.width = 20;
        this.height = 15;
        this.dimensions = [this.width, this.height];
        this.apple = new Apple();
        this.snake = new Snake();
    }

    restart() {
        this.apple = new Apple();
        this.snake = new Snake();
    }

    render() {
        const grid = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = $("<div>");
                const position = [j, i];
                cell.addClass('cell');
                if (this.isCellEatenApple(position)) {
                    cell.addClass('eaten-apple');
                } else if (this.isCellSnake(position)) {
                    cell.addClass('snake');
                } else if (this.isCellApple(position)) {
                    cell.addClass('apple');
                } else {
                    cell.addClass('space');
                }
                grid.push(cell);
            }
        }
        return grid;
    }

    move() {
        this.snake.move();
    }
    
    turnSnake(direction) {
        this.snake.turn(direction);
    }

    eatApple() {
        this.snake.eat(this.apple);
        this.respawnApple();
    }
    
    respawnApple() {
        do {
            this.apple.respawn(this.dimensions);
        } while (this.isCellSnake(this.apple.position))
    }
    
    hasSnakeEatenApple() {
        return this.isCellApple(this.snake.head());
    }

    isCellSnake(position) {
        return this.contains(this.snake.segments, position);
    }
    
    isCellApple(position) {
        return this.equivalent(this.apple.position, position);
    }
    
    isCellEatenApple(position) {
        const eaten = this.snake.getEatenApples();
        for (let i = 0; i < eaten.length; i++) {
            const apple = eaten[i];
            if (this.equivalent(apple, position)) {
                return true;
            }
        }
        return false;
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

    willSnakeEatApple() {
        const head = this.snake.head();
        const direction = this.snake.direction;
        
        const willEatApple = 
           ((direction === Coordinate.NORTH && this.isCellApple([head[0], head[1] - 1])) ||
            (direction === Coordinate.SOUTH && this.isCellApple([head[0], head[1] + 1])) ||
            (direction === Coordinate.WEST && this.isCellApple([head[0] - 1, head[1]])) ||
            (direction === Coordinate.EAST && this.isCellApple([head[0] + 1], head[1])));

        return willEatApple;
    }

    willSnakeDie() {
        const head = this.snake.head();
        const direction = this.snake.direction;
        
        const willHitWall = 
           ((head[1] === this.dimensions[1] - 1 && direction === Coordinate.SOUTH) ||
            (head[1] === 0 && direction === Coordinate.NORTH) ||
            (head[0] === this.dimensions[0] - 1 && direction === Coordinate.EAST) ||
            (head[0] === 0 && direction === Coordinate.WEST));

        const willHitSelf = 
           ((direction === Coordinate.NORTH && this.isCellSnake([head[0], head[1] - 1])) ||
            (direction === Coordinate.SOUTH && this.isCellSnake([head[0], head[1] + 1])) ||
            (direction === Coordinate.WEST && this.isCellSnake([head[0] - 1, head[1]])) ||
            (direction === Coordinate.EAST && this.isCellSnake([head[0] + 1], head[1])));

        return willHitWall || willHitSelf;
    }
}