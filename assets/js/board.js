class Board {
    /**
     * Creates a new {@link Board}.
     */
    constructor() {
        this.width = 30;
        this.height = 25;
        this.dimensions = [this.width, this.height];
        this.apple = new Apple();
        this.snake = new Snake();
    }

    /**
     * Resets the {@link Board}. 
     */
    reset() {
        this.apple = new Apple();
        this.snake = new Snake();
    }

    /**
     * Renders the {@link Board}.
     * 
     * @param el the jquery element to draw on. 
     */
    render(el) {
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
        el.html(grid);
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
        const cardinal = Coordinate.Cardinal;

        const willEatApple = 
           ((direction === cardinal.NORTH && this.isCellApple([head[0], head[1] - 1])) ||
            (direction === cardinal.SOUTH && this.isCellApple([head[0], head[1] + 1])) ||
            (direction === cardinal.WEST && this.isCellApple([head[0] - 1, head[1]])) ||
            (direction === cardinal.EAST && this.isCellApple([head[0] + 1], head[1])));

        return willEatApple;
    }

    willSnakeDie() {
        const head = this.snake.head();
        const direction = this.snake.direction;
        const cardinal = Coordinate.Cardinal;

        const willHitWall = 
           ((head[1] === this.dimensions[1] - 1 && direction === cardinal.SOUTH) ||
            (head[1] === 0 && direction === cardinal.NORTH) ||
            (head[0] === this.dimensions[0] - 1 && direction === cardinal.EAST) ||
            (head[0] === 0 && direction === cardinal.WEST));

        const willHitSelf = 
           ((direction === cardinal.NORTH && this.isCellSnake([head[0], head[1] - 1])) ||
            (direction === cardinal.SOUTH && this.isCellSnake([head[0], head[1] + 1])) ||
            (direction === cardinal.WEST && this.isCellSnake([head[0] - 1, head[1]])) ||
            (direction === cardinal.EAST && this.isCellSnake([head[0] + 1], head[1])));

        return willHitWall || willHitSelf;
    }
}