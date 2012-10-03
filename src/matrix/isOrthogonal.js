// ### Matrix.prototype.isOrthogonal()
// Determines if the matrix is a orthogonal.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isOrthogonal', function () {
  return this.transpose().times(this).isIdentity();
});