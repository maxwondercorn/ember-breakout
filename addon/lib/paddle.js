/**
 * Creates a new Canvas
 * @class
 * @classdesc Manages paddle properties and drawing
 **/

export class Paddle {
  /**
   * Create a Paddle
   *
   * @param  {!Number} height Paddle height in pixels
   * @param  {!String} style Paddle color
   */
  constructor(height, style = '#0095DD') {
    this.height = height;
    this.style = style;
  }
  
  /**
   * Draws the paddle
   * 
   * @param  {!Element} canvas Game canvas element
   * @param  {} paddleX Current paddle X positon
   */
  draw(canvas, paddleX) {
    canvas.drawRec(
      paddleX,
      canvas.height - this.height,
      this.width,
      this.height,
      this.style
    );
  }
}
