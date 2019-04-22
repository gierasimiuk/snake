var Coordinates = Object({"NORTH":1, "EAST":2, "SOUTH":3, "WEST":4});
Coordinates.isOpposite = function(directionA, directionB) {
    return (
        (directionA === Coordinates.NORTH && directionB === Coordinates.SOUTH) ||
        (directionA === Coordinates.SOUTH && directionB === Coordinates.NORTH) ||
        (directionA === Coordinates.EAST && directionB === Coordinates.WEST) ||
        (directionA === Coordinates.WEST && directionB === Coordinates.EAST)
    )
}
Object.freeze(Coordinates);