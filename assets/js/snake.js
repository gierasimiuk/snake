class Snake {
    /**
     * Creates a new {@link Snake};
     */
    constructor() {
        this.direction = Coordinate.Cardinal.EAST;
        this.segments = [[5, 12], [4, 12], [3, 12]];
        this.apples = [];
        this.appleIndex = [];
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
        apple.position.distance = 0;
        this.apples.push(apple.position);
        this.grow = true;
    }

    /**
     * @return the apples eaten by this snake.
     */
    getEatenApples() {
        return this.apples;
    }

    /**
     * Turns in the direction of the given {@link Coordinate.Cardinal}. Note 
     * that this function does not move the snake, it only updates it's 
     * direction.
     * 
     * @param {Coordinate.Cardinal} direction the new direction.
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
        if (this.direction === Coordinate.Cardinal.NORTH) {
            seg = [0, -1];
        }
        else if (this.direction === Coordinate.Cardinal.SOUTH) {
            seg = [0, 1];
        }
        else if (this.direction === Coordinate.Cardinal.EAST) {
            seg = [1, 0];
        }
        else if (this.direction === Coordinate.Cardinal.WEST) {
            seg = [-1, 0];
        }
        this.update(seg);
    }

    /**
     * Updates the snake's segments given a segment delta.
     * 
     * @param {Array} segment the delta consisting of an x, y coordinate. 
     */
    update(segment) {
        var last = this.segments[this.segments.length - 1];
        for (var i = this.segments.length - 1; i > 0; i--) {
            this.segments[i] = this.segments[i - 1];
        }
        this.segments[0] = [
            this.segments[0][0] + segment[0], this.segments[0][1] + segment[1]
        ];
        if (this.grow) {
            this.segments.push(last);
            this.grow = false;
        }
        for (var i = 0; i < this.apples.length; i++) {
            if (this.apples[i].distance < this.segments.length) {
                this.apples[i].distance++;
            } else {
                this.apples.pop();
            }
        }
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