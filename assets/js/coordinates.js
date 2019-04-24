/**
 * The four coordinates; NORTH, SOUTH, EAST, and WEST
 */
var Coordinate = Object({"NORTH":1, "EAST":2, "SOUTH":3, "WEST":4});

/**
 * Checks to see whether the two given {@link Coordinate} are opposite each 
 * other, returning true if so, false otherwise.
 * 
 * @param directionA the first {@link Coordinate}.
 * @param directionB the second {@link Coordinate}.
 */
Coordinate.isOpposite = function(directionA, directionB) {
    return (
        (directionA === Coordinate.NORTH && directionB === Coordinate.SOUTH) ||
        (directionA === Coordinate.SOUTH && directionB === Coordinate.NORTH) ||
        (directionA === Coordinate.EAST && directionB === Coordinate.WEST) ||
        (directionA === Coordinate.WEST && directionB === Coordinate.EAST)
    )
}

/**
 * Make the {@link Coordinate} immutable.
 */
Object.freeze(Coordinate);