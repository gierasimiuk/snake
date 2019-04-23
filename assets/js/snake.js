class Snake {

    constructor() {
        this.direction = Coordinates.EAST;
        this.segments = [[5, 7], [4, 7], [3, 7]];
        this.eatenApples = [];
    }

    turn(newDirection) {
        if (!Coordinates.isOpposite(this.direction, newDirection)) {
            this.direction = newDirection;            
        }
    }

    move() {
        let seg = this.head();
        if (this.direction === Coordinates.NORTH) {
            seg = [0, -1];
        }
        else if (this.direction === Coordinates.SOUTH) {
            seg = [0, 1];
        }
        else if (this.direction === Coordinates.EAST) {
            seg = [1, 0];
        }
        else if (this.direction === Coordinates.WEST) {
            seg = [-1, 0];
        }
        this.update(seg);
    }

    update(segment) {
        for (var i = this.segments.length - 1; i > 0; i--) {
            this.segments[i] = this.segments[i - 1];
        }
        this.segments[0] = [
            this.segments[0][0] + segment[0], this.segments[0][1] + segment[1]
        ];
    }

    head() {
        return this.segments[0];
    }

    segments() {
        return this.segments;
    }
}