class Game {
    
    constructor(selector) {
        this.$el = $(selector);
        this.score = 0;
        this.played = 0;
        this.board = new Board();
        this.active = false;
        this.speed = 500;
        $('html').keydown(function(e) {
            this.keydown(e);
        }.bind(this));
    }

    startGame() {
        this.clearStatus();
        this.board.respawnApple();
        window.setInterval(function() {
            this.step();
        }.bind(this), this.speed);
        this.active = true;        
    }
    
    gameOver() {
        this.setStatus('GAME OVER!');
        this.active = false;
    }
    
    navigate(direction) {
        if (this.active) {
            this.board.turnSnake(direction);
        }
    }
    
    step() {
        if (this.board.willSnakeDie()) {
            this.gameOver();
        }
        else if (this.board.willSnakeEatApple()) {
            this.board.eatApple();
        } 
        this.board.render();
    }

    keydown(e) {
        switch(e.which) {
          case 37: this.navigate(Coordinates.WEST); break;
          case 38: this.navigate(Coordinates.NORTH); break;
          case 39: this.navigate(Coordinates.EAST); break;
          case 40: this.navigate(Coordinates.SOUTH); break;
          case 32: this.startGame(); break;
          default: return;
        }
    }

    clearStatus() {
        $('#board .status').remove();         
    }

    setStatus(status) {
        $('#board').append($ ('<h3 class="status">').addClass('game-status').text(status));
    }
}