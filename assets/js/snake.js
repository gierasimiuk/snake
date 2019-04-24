class Snake {
    /**
     * Creates a new {@link Snake};
     */
    constructor() {
        this.direction = Coordinate.EAST;
        this.segments = [[5, 7], [4, 7], [3, 7]];
        this.apples = [];
    }

    /**
     * Returns the segment at the front of the snake.
     */
    head() {
        return this.segments[0];
    }

    /**
     * Eats an {@link Apple}. 
     * 
     * @param {Apple} apple the apple to consume.
     */
    eat(apple) {
        this.apples.push(apple.position);
    }

    /**
     * 
     * @return the apples eaten by this snake.
     */
    getEatenApples() {
        return this.apples;
    }

    /**
     * Turns in the direction of the given {@link Coordinate}. Note that this
     * function does not move the snake, it strictly updates it's direction.
     * 
     * @param {Coordinate} direction the new direction.
     */
    turn(direction) {
        if (!Coordinate.isOpposite(this.direction, direction)) {
            this.direction = direction;    
        }
    }

    /**
     * Moves the {@link Snake} by one cell. The cell to which the snake moves
     * to is determined by it's direction.
     */
    move() {
        let seg = this.head();
        if (this.direction === Coordinate.NORTH) {
            seg = [0, -1];
        }
        else if (this.direction === Coordinate.SOUTH) {
            seg = [0, 1];
        }
        else if (this.direction === Coordinate.EAST) {
            seg = [1, 0];
        }
        else if (this.direction === Coordinate.WEST) {
            seg = [-1, 0];
        }
        this.update(seg);
    }

    /**
     * Updates the snake's position given a delta.
     * 
     * @param {Coordinate} segment the delta {@link Coordinate}.
     */
    update(segment) {
        for (var i = this.segments.length - 1; i > 0; i--) {
            this.segments[i] = this.segments[i - 1];
        }
        this.segments[0] = [
            this.segments[0][0] + segment[0], this.segments[0][1] + segment[1]
        ];
    }

    /**
     * Returns a string representation of the object.
     * 
     * @return the object to string.
     */
    toString() {
        return 'Snake (direction=' + this.position 
            + ', length="' + this.segments.length + '")';
    }
}