class Apple {
    constructor() {
        this.respawn();
    }
    respawn() {
        this.position = [
            Math.floor(Math.random() * 19),
            Math.floor(Math.random() * 14)
        ]
    }
}