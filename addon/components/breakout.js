import { action, set } from '@ember/object';
import Component from '@glimmer/component';

export default class BreakoutComponent extends Component {
  // delta x and y for keypresses
  dx = 2;
  dy = -2;

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

    // the brick wall
    this.brickRowCount = this.args.brickRowCount ?? 3;
    this.brickColumnCount = this.args.brickColumnCount ?? 5;

    this.ballRadius = this.args.ballRadius ?? 10;
    this.lives = this.args.lives ?? 3;
  }

  @action
  initGame(element) {
    this.canvas = element;
    this.ctx = element.getContext('2d');

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

    this.createBricks();
    this.drawBricks();

    // this.createBricks(5, 3);
    // this.drawBricks(this.bricks, 5, 3);
    this.drawPaddle();

    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener(
      'mousemove',
      this.mouseMoveHandler.bind(this),
      false
    );
  }

  willDestroy() {
    super.willDestroy(...arguments);
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  createBricks() {
    for (let row = 0; row < this.brickRowCount; row++) {
      this.bricks[row] = [];
      for (let col = 0; col < this.brickColumnCount; col++) {
        this.bricks[row][col] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  // keydown event listener
  keyDownHandler(e) {
    if (e.code == 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.code == 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  // keyup event handler
  keyUpHandler(e) {
    if (e.code == 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.code == 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  // mouse move
  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }

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

  drawBall(radius) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.canvas.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawBricks() {
    for (let row = 0; row < this.brickRowCount; row++) {
      for (let col = 0; col < this.brickColumnCount; col++) {
        if (this.bricks[row][col].status == 1) {
          let brickX =
            col * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          let brickY =
            row * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[row][col].x = brickX;
          this.bricks[row][col].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = '#0095DD';
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  @action
  newGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks();
    this.drawBall(this.ballRadius);
    this.drawPaddle();
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
        // this.lives--;

        if (!this.lives) {
          // alert('GAME OVER');
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
