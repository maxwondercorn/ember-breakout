import { action, set } from '@ember/object';
import Component from '@glimmer/component';

// import classes
import { Canvas } from '../lib/canvas';
import { Paddle } from '../lib/paddle';
import { Brick } from '../lib/brick';

export default class BreakoutComponent extends Component {
  // ball movement delta x and y
  dx = 2;
  dy = -2;

  // Use this style if not specified in component args
  // defaultFillStyle = '#0095DD';

  score = 0;

  // left or right arrow key pressed
  rightPressed = false;
  leftPressed = false;

  constructor() {
    super(...arguments);

    // set canvas width and height in template
    this.width = this.args.width ?? 480;
    this.height = this.args.height ?? 320;

    // create a new paddle - default height is 10 pixels
    this.paddle = new Paddle(10, this.defaultFillStyle);

    // default paddle width is 75 pixels
    this.paddle.width = this.args.paddleWidth ?? 75;

    // the brick wall
    this.bricks = new Brick(20, this.args.brickFillStyle);
    this.bricks.width = this.args.brickWidth ?? 75;
    this.bricks.rowCount = this.args.brickRowCount ?? 3;
    this.bricks.colCount = this.args.brickColumnCount ?? 5;

    // the game ball
    this.ballRadius = this.args.ballRadius ?? 10;
    this.ballFillStyle = this.args.ballFillStyle ?? this.defaultFillStyle;

    // How many lives does this cat have?
    this.lives = this.args.lives ?? 3;
  }

  @action
  initGame(element) {
    this.canvas = new Canvas(element);

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    // intial paddle x position and draw it
    this.paddleX = (this.canvas.width - this.paddle.width) / 2;
    this.paddle.draw(this.canvas, this.paddleX);

    // bricks
    this.bricks.create();
    this.bricks.draw(this.canvas);

    // event listeners
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    // prettier-ignore
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }

  /**
   * Glimmer component lifecycle hook
   */
  willDestroy() {
    super.willDestroy(...arguments);
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  // ****** Event listners for game play ******

  /**
   * Keydown event listener
   *
   * @param  {Object} e Event object
   */
  keyDownHandler(e) {
    if (e.code == 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.code == 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  /**
   * keyup event handler
   *
   * @param  {Object} e Event object
   */
  keyUpHandler(e) {
    if (e.code == 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.code == 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  /**
   * mouse move event handler
   *
   * @param  {Object} e Event object
   */
  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddle.width / 2;
    }
  }

  /**
   * Detects when the ball strikes a brick and adjusts the score
   */
  collisionDetection() {
    for (let row = 0; row < this.bricks.rowCount; row++) {
      for (let col = 0; col < this.bricks.colCount; col++) {
        let brick = this.bricks.brick(row, col);
        
        if (brick.status == 1) {
          if (
            this.x > brick.x &&
            this.x < brick.x + this.bricks.width &&
            this.y > brick.y &&
            this.y < brick.y + this.bricks.height
          ) {
            this.dy = -this.dy;
            brick.status = 0;

            set(this, 'score', this.score + 1);

            // convert when @tracked is used
            // this.score++;
            if (this.score == this.bricks.rowCount * this.bricks.colCount) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  /**
   * Draw the game ball
   *
   * @param  {!Object} canvas Instance of Canvas class
   * @param  {!Number} radius Radius for the game ball
   * @param  {!String} fillStyle Ball fill style
   */
  drawBall(canvas, radius, fillStyle) {
    canvas.drawCircle(this.x, this.y, radius, fillStyle);
  }

  @action
  /**
   * Start playing the game
   */
  newGame() {
    this.canvas.clearCanvas();
    this.bricks.draw(this.canvas);
    this.drawBall(this.canvas, this.ballRadius, this.ballFillStyle);
    this.paddle.draw(this.canvas, this.paddleX);

    this.collisionDetection();

    if (
      this.x + this.dx > this.canvas.width - this.ballRadius ||
      this.x + this.dx < this.ballRadius
    ) {
      this.dx = -this.dx;
    }

    // top of canvas
    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddle.width) {
        this.dy = -this.dy;
      } else {
        set(this, 'lives', this.lives - 1);

        // convert when @tracked is used
        // this.lives--;

        if (!this.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.x = this.canvas.width / 2;
          this.y = this.canvas.height - 30;
          this.dx = 2;
          this.dy = -2;
          this.paddleX = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }

    if (
      this.rightPressed &&
      this.paddleX < this.canvas.width - this.paddle.width
    ) {
      this.paddleX += 7;
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7;
    }

    this.x += this.dx;
    this.y += this.dy;
    requestAnimationFrame(this.newGame);
  }
}
