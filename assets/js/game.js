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
        if (this.intervalId) {
            return;
        }
        this.clearStatus();
        this.board.restart();
        this.firstStep();
        this.intervalId = window.setInterval(function() {
            this.step();
        }.bind(this), this.speed);
        this.active = true;
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
        if (this.board.willSnakeDie()) {
            this.gameOver();
            return;
        }
        else if (this.board.willSnakeEatApple()) {
            this.board.eatApple();
        } else if (this.board.hasSnakeEatenApple()) {
            this.board.eatApple();
        }
        this.board.move();
        this.$el.html(this.board.render());
    }

    keydown(e) {
        switch(e.which) {
          case 37: this.navigate(Coordinate.WEST); break;
          case 38: this.navigate(Coordinate.NORTH); break;
          case 39: this.navigate(Coordinate.EAST); break;
          case 40: this.navigate(Coordinate.SOUTH); break;
          case 32: this.startGame(); break;
          default: return;
        }
    }

    gameOver() {
        this.processEndOfGame();
        this.setStatus('GAME OVER!');
        $('.stat-played').html(this.played);
    }

    processEndOfGame() {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
        this.active = false;
        this.played++;
    }

    updateScore(newScore) {
        $('.stat-score').html(this.score);
    }

    clearStatus() {
        $('#board .status').remove();         
    }

    setStatus(status) {
        $('#board .cell').remove(); 
        $('#board').append($ ('<h3 class="status">').addClass('game-status').text(status));
    }
}