// ### Matrix.prototype.divide()
// Multiplies the matrix by the inverse of a number or a matrix
//
// *@returns {matrix}*
divide(n) {
  return this.times(MathLib.inverse(n));
}