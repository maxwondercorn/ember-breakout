/**
 * Creates a new Bric
 * @class
 * @classdesc Manages brick properties and drawing
 **/

export class Brick {
  /**
   * Create a Brick
   *
   * @param  {!Number} height Brick height in pixels
   * @param  {!String} style Brick color
   */
  constructor(height, style = '#0095DD') {
    this.height = height;
    this.style = style;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
  }
  /**
   * @param  {!Number} row Bricks array row
   * @param  {!Number} col Bricks array column
   */
  brick(row, col) {
    return this.bricksArray[row][col];
  }

  /**
   * Initializes the 2 dimensional bricks array
   */
  create() {
    this.bricksArray = [];

    for (let row = 0; row < this.rowCount; row++) {
      this.bricksArray[row] = [];
      for (let col = 0; col < this.colCount; col++) {
        this.bricksArray[row][col] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  /**
   *   * Draws the brick rows and columns
   * 
   * @param  {} canvas
   */
  draw(canvas) {
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        if (this.bricksArray[row][col].status == 1) {
          let brickX =
            col * (this.width + this.padding) + this.offsetLeft;
          let brickY =
            row * (this.height + this.padding) + this.offsetTop;
          this.bricksArray[row][col].x = brickX;
          this.bricksArray[row][col].y = brickY;
          // debugger
          canvas.drawRec(
            brickX,
            brickY,
            this.width,
            this.height,
            this.style
          );
        }
      }
    }
  }
}
