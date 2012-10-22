// ### Complex.prototype.plus()
// Add complex numbers
//
// *@param {complex}* The number to be added  
// *@returns {complex}*
plus(c) {
  if (c.type === "complex") {
    return new MathLib.Complex(MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im));
  }
  else if (typeof c === "number") {
    return new MathLib.Complex(MathLib.plus(this.re, c), this.im);
  }
}