// ### Matrix.prototype.isOrthogonal()
// Determines if the matrix is a orthogonal.
//
// *@returns {boolean}*
isOrthogonal() {
  return this.transpose().times(this).isIdentity();
}