// ### Matrix.prototype.copy()
// Copies the matrix
//
// *@returns {matrix}*
copy() {
  return this.map(MathLib.copy);
}