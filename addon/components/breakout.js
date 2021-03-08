import { action, set } from '@ember/object';
import Component from '@glimmer/component';

  /**
   * Creates a new Canvas
   * @class
   * @classdesc Handles working with canvas element and 2d context
   **/
class Canvas {
  /**
   * Create a Canvas
   * @param  {!Element} canvas Canvas dom element
   */
  constructor(canvas) {
    this.canvasElement = canvas;
    this.canvasCtx = this.canvasElement.getContext('2d');
  }

  /**
   * Get the canvas element
   * @return {element} The canvas element
   */
  get canvas() {
    return this.canvasElement;
  }

  /**
   * Get the canvas 2d context
   * @return {context} The canvas 2d context
   */
  get ctx() {
    return this.canvasCtx;
  }

  /**
   * Get the canvas width
   * @return {number} The canvas's width
   */
  get width() {
    return this.canvasElement.width;
  }

  /**
   * Get the canvas height
   * 
   */
  get height() {
    return this.canvasElement.height;
  }

  /**
   * Draw a circle with canvas 2D context
   * 
   * @param  {!Number} x Circle center x corridinate
   * @param  {!Number} y Circle center y coordinate
   * @param  {!Number} radius Circle radius
   * @param  {!Number} fillStyle Circle fill style
   */
  drawCircle(x, y, radius, fillStyle) {
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(x, y, radius, 0, Math.PI * 2);
    this.canvasCtx.fillStyle = fillStyle;
    this.canvasCtx.fill();
    this.canvasCtx.closePath();
  }

  /**
   * Draw a rectangle with canvas 2D context
   * 
   * @param  {!Number} x1 First X coordinate
   * @param  {!Number} y1 First Y coordinate
   * @param  {!Number} x2 Second X coordinate
   * @param  {!Number} y2 Second Y coordinate
   * @param  {!String} fillStyle Rectangle fill style
   */
  drawRec(x1, y1, x2, y2, fillStyle) {
    this.canvasCtx.beginPath();
    this.canvasCtx.rect(x1, y1, x2, y2);
    this.canvasCtx.fillStyle = fillStyle;
    this.canvasCtx.fill();
    this.canvasCtx.closePath();
  }
}

export default class BreakoutComponent extends Component {
  // delta x and y for keypresses
  dx = 2;
  dy = -2;

  // Use this style if not specified in component args
  defaultFillStyle = '#0095DD';

  // paddle height is fixed
  paddleHeight = 10;

  // bricks
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 30;
  brickOffsetLeft = 30;

  score = 0;

  bricks = [];

  rightPressed = false;
  leftPressed = false;

  constructor() {
    super(...arguments);

    // set canvas width and height
    this.width = this.args.width ?? 480;
    this.height = this.args.height ?? 320;

    // paddle width
    this.paddleWidth = this.args.paddleWidth ?? 75;
    this.paddleFillStyle = this.args.paddleFillStyle ?? this.defaultFillStyle;

    // the brick wall
    this.brickRowCount = this.args.brickRowCount ?? 3;
    this.brickColumnCount = this.args.brickColumnCount ?? 5;
    this.brickFillStyle = this.args.brickFillStyle ?? this.defaultFillStyle;

    this.ballRadius = this.args.ballRadius ?? 10;
    this.ballFillStyle = this.args.ballFillStyle ?? this.defaultFillStyle;

    this.lives = this.args.lives ?? 3;
  }

  @action
  initGame(element) {
    this.canvas = new Canvas(element);

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    // paddle
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
    this.drawPaddle(this.canvas, this.paddleWidth, this.paddleHeight, this.paddleFillStyle);

    // bricks
    this.createBricks(this.bricks, this.brickRowCount, this.brickColumnCount);
    this.drawBricks(this.canvas);

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

  /**
   * Initializes the 2 dimenstional bricks array (bricks[rows][columns])
   *
   * @param  {!Array} bricks this.bricks
   * @param  {!Number} rows Number of brick rows
   * @param  {!Number} cols Number of brick columns
   */
  createBricks(bricks, rows, cols) {
    for (let row = 0; row < rows; row++) {
      bricks[row] = [];
      for (let col = 0; col < cols; col++) {
        bricks[row][col] = { x: 0, y: 0, status: 1 };
      }
    }
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
    // the event handler sees the Canvas class not the instanzites variable this.canvas
    // this allows access to the canvas and component class properties
    const relativeX = e.clientX - this.canvas.canvasElement.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }

  /**
   * Detects when the ball strikes a brick and adjusts the score
   */
  collisionDetection() {
    for (let row = 0; row < this.brickRowCount; row++) {
      for (let col = 0; col < this.brickColumnCount; col++) {
        let brick = this.bricks[row][col];
        if (brick.status == 1) {
          if (
            this.x > brick.x &&
            this.x < brick.x + this.brickWidth &&
            this.y > brick.y &&
            this.y < brick.y + this.brickHeight
          ) {
            this.dy = -this.dy;
            brick.status = 0;

            set(this, 'score', this.score + 1);

            // convert when @tracked is used
            // this.score++;
            if (this.score == this.brickRowCount * this.brickColumnCount) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  // ****** Game elements ******

  /**
   * Draw the game ball
   *
   * @param  {!Object} ctx The 2d context of the canvas
   * @param  {!Number} radius Radius for the game ball
   * @param  {!String} fillStyle Ball fill style
   */
  drawBall(canvas, radius, fillStyle) {
    canvas.drawCircle(this.x, this.y, radius, fillStyle);
  }

  /**
   * Draw the game paddle
   *
   * @param  {!Object} ctx The 2d context of the canvas (this.ctx)
   * @param  {!Number} width Paddle width in pixels
   * @param  {!Number} height Paddle height in pixels
   * @param  {!String} fillStyle Paddle fill style
   */
  drawPaddle(canvas, width, height, fillStyle) {
    canvas.drawRec(this.paddleX, canvas.height - height, width, height, fillStyle);
  }

  /**
   * Draw the field of bricks
   */
  drawBricks(canvas) {
    for (let row = 0; row < this.brickRowCount; row++) {
      for (let col = 0; col < this.brickColumnCount; col++) {
        if (this.bricks[row][col].status == 1) {
          let brickX =
            col * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          let brickY =
            row * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[row][col].x = brickX;
          this.bricks[row][col].y = brickY;
          canvas.drawRec(brickX, brickY, this.brickWidth, this.brickHeight, this.brickFillStyle);
        }
      }
    }
  }

  @action
  /**
   * Start playing the game
   */
  newGame() {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks(this.canvas);
    this.drawBall(this.canvas, this.ballRadius, this.ballFillStyle);
    this.drawPaddle(
      this.canvas,
      this.paddleWidth,
      this.paddleHeight,
      this.paddleFillStyle
    );
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
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
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
          this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        }
      }
    }

    if (
      this.rightPressed &&
      this.paddleX < this.canvas.width - this.paddleWidth
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
