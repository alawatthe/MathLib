// ### Complex.prototype.toMatrix()
// Transforms the complex number to a 2x2 matrix
//
// *@returns {matrix}*
toMatrix() {
  return new MathLib.Matrix([[this.re, MathLib.negative(this.im)], [this.im, this.re]]);
}