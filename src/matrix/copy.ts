// ### Matrix.prototype.copy()
// Copies the matrix
//
// *@returns {Matrix}*
copy() : Matrix {
  return this.map(MathLib.copy);
}