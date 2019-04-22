class Board {
    constructor() {
        this.width = 20;
        this.height = 15;
        this.dimensions = [this.width, this.height];
        this.apple = new Apple();
        this.snake = new Snake();
    }
    eatApple() {
        this.snake.eat(this.apple);
        respawnApple();
    }
    willSnakeDie() {
        return false;
    }
    willSnakeEatApple() {
        return false;
    }
    turnSnake(direction) {
        this.snake.turn(direction);
    }
    respawnApple() {

    }
    render() {
        
    }
    move() {

    }
    contains(segments, position) {
        let result = false;
        segments.forEach(function(segment) {
            if (segment[0] === position[0] && segment[1] === position[1]) {
                result = true;
                return;
            }
        });
        return result;
    }
}