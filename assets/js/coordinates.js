var Coordinate = {};

/**
 * The four cardinal coordinates; NORTH, SOUTH, EAST, and WEST
 */
Coordinate.Cardinal = Object({"NORTH":1, "EAST":2, "SOUTH":3, "WEST":4});

/**
 * Checks to see whether the two given {@link Coordinate.Cardinal} are opposite 
 * each other, returning true if so, false otherwise.
 * 
 * @param directionA the first {@link Coordinate.Cardinal}.
 * @param directionB the second {@link Coordinate.Cardinal}.
 */
Coordinate.isOpposite = function(directionA, directionB) {
    const cardinal = Coordinate.Cardinal;
    return (
        (directionA === cardinal.NORTH && directionB === cardinal.SOUTH) ||
        (directionA === cardinal.SOUTH && directionB === cardinal.NORTH) ||
        (directionA === cardinal.EAST && directionB === cardinal.WEST) ||
        (directionA === cardinal.WEST && directionB === cardinal.EAST)
    )
}

/**
 * Make the {@link Coordinate} immutable.
 */
Object.freeze(Coordinate);