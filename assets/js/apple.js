class Apple {
    /**
     * Creates a new {@link Apple} at location [14, 7] on the board.
     */
    constructor() {
        this.position = [14, 7];
    }

    /**
     * Respawns the {@link Apple} at a new, random location on the board.
     * 
     * @param dimensions the dimensions of the board.
     */
    respawn(dimensions) {
        this.position = [
            Math.floor(Math.random() * (dimensions[0] - 1)),
            Math.floor(Math.random() * (dimensions[1] - 1))
        ]
    }

    /**
     * Returns a string representation of the object.
     * 
     * @return the object to string.
     */
    toString() {
        return 'Apple (position=' + this.position + ')';
    }
}