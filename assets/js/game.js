class Game {
    /**
     * Creates a new {@link Game}.
     * 
     * @param {String} selector the DOM selector. 
     */
    constructor(selector) {
        this.$el = $(selector);
    }

    /**
     * Initialises the {@link Game}.
     */
    init() {
        this.score = 0;
        this.played = 0;
        this.board = new Board();
        this.active = false;
        this.speed = 100;

        $('html').keydown(function(e) {
            const cardinal = Coordinate.Cardinal;
            switch(e.which) {
                case 37: this.turnSnake(cardinal.WEST); break;
                case 38: this.turnSnake(cardinal.NORTH); break;
                case 39: this.turnSnake(cardinal.EAST); break;
                case 40: this.turnSnake(cardinal.SOUTH); break;
                case 32: this.start(); break;
                default: return;
            }
        }.bind(this));
    }

    /**
     * Starts the {@link Game}.
     */
    start() {
        this.clearStatusHtml();
        this.clearScoreHtml();
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
        }
        this.intervalId = window.setInterval(function() {
            this.step();
        }.bind(this), this.speed);
        this.board.reset();
        this.active = true;
        this.step();
    }
    
    /**
     * Turn the {@link Snake}. in the given direction. 
     * 
     * @param {Coordinate.Cardinal} direction 
     */
    turnSnake(direction) {
        if (this.active) {
            this.board.turnSnake(direction);
        }
    }
    
    /**
     * Plays the {@link Game} out for one step.
     */
    step() {
        if (this.board.willSnakeDie()) {
            this.gameOver();
            return;
        } else if (this.board.willSnakeEatApple() || 
                   this.board.hasSnakeEatenApple()) {
            this.board.eatApple();
            this.score++;
            this.updateScoreHtml(this.score);
        }
        this.board.move();
        this.board.render(this.$el);
    }

    /**
     * Resets the {@link Game}. This includes clearing the interval timer, 
     * updating the 'games played' count and resetting the score. 
     */
    reset() {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
        this.active = false;
        this.played++;
        this.score = 0;
    }

    /**
     * {@link Game}Over.
     */
    gameOver() {
        this.reset();
        this.updateStatusHtml('GAME OVER!');
        this.updatePlayedHtml(this.played);
    }

    clearStatusHtml() {
        $('#board .status').remove();         
    }

    clearScoreHtml() {
        $('.stat-score').html(0);
    }

    updatePlayedHtml(played) {
        $('.stat-played').html(played);
    }

    updateScoreHtml(score) {
        $('.stat-score').html(score);
    }

    updateStatusHtml(status) {
        $('#board .cell').remove(); 
        $('#board').append($ ('<h3 class="status">')
            .addClass('game-status')
            .text(status));
    }
}