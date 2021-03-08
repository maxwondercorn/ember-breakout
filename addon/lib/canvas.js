  /**
   * Creates a new Canvas
   * @class
   * @classdesc Handles working with canvas element and 2d context
   **/
  
  export class Canvas {
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
   * @return {number} The canvas's height
   */
  get height() {
    return this.canvasElement.height;
  }


    /**
   * Clears the canvas
   */
  clearCanvas() {
    this.canvasCtx.clearRect(0, 0, this.width, this.height)
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