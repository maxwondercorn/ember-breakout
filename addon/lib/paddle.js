/**
 * Creates a new Paddle
 * @class
 * @classdesc
 **/

export class Paddle {
  /**
   * Create a Paddle
   * 
   * @param  {!Number} height Paddle height in pixels
   * @param  {!String} style Paddle color
   */
  constructor(height, style) {
    this.padHeight = height;
    this.padStyle = style;
  }
  /**
   * Get paddle height
   */
  get height() {
    return this.padHeight;
  }
 
  /**
   * Set paddle width
   * 
   * @param  {!Number} width Paddle width in pixels
   */
  set width(width) {
    this.padWidth = width;
  }
 
  /**
   * Get paddle width
   */
  get width() {
    return this.padWidth;
  }
 
  /**
   * Set paddle fill sytle
   * @param  {!string} style Paddle color
   */
  set fillStyle(style) {
    this.padStyle = style;
  }
 
  /**
   * Get paddle fill style
   */
  get fillStyle() {
    return this.padStyle;
  }
}
