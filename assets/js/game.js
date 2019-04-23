class Game {
    constructor(selector) {
        this.$el = $(selector);
        this.score = 0;
        this.played = 0;
        this.board = new Board();
        this.active = false;
        this.speed = 120;
        $('html').keydown(function(e) {
            this.keydown(e);
        }.bind(this));
    }

    startGame() {
        this.clearStatus();
        this.board.restart();
        this.board.respawnApple();
        this.firstStep();
        this.intervalId = window.setInterval(function() {
            this.step();
        }.bind(this), this.speed);
        this.active = true;      
    }
    
    gameOver() {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
        this.setStatus('GAME OVER!');
        this.active = false;
    }
    
    navigate(direction) {
        if (this.active) {
            this.board.turnSnake(direction);
        }
    }

    firstStep() {
        this.$el.html(this.board.render());
    }
    
    step() {
        if (!this.active) {
            return;
        }
        // console.log(new Date().toUTCString());
        if (this.board.willSnakeDie()) {
            this.gameOver();
            return;
        }
        // else if (this.board.willSnakeEatApple()) {
        //     this.board.eatApple();
        // } 
        this.board.move();
        this.$el.html(this.board.render());
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
        $('#board .cell').remove(); 
        $('#board').append($ ('<h3 class="status">').addClass('game-status').text(status));
    }
}