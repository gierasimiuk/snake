class Snake {
    constructor() {
        this.direction = Coordinates.EAST;
        this.segments = [5, 8], [4, 8], [3, 8];
        this.eatenApples = [];
    }
    turn(newDirection) {
        if (!Coordinates.isOpposite(this.direction, newDirection)) {
            this.direction = newDirection;            
        }
    }
    move() {
        if (this.direction === Coordinates.NORTH) {

        }
        if (this.direction === Coordinates.SOUTH) {
            
        }
        if (this.direction === Coordinates.EAST) {
            
        }
        if (this.direction === Coordinates.WEST) {
            
        }
    }
    head() {
        return this.segments[0];
    }
}