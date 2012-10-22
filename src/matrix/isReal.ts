// ### Matrix.prototype.isReal()
// Determines if the matrix has only real entries
//
// *@returns {boolean}*
isReal() {
  return this.every(MathLib.isReal);
}