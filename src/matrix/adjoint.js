// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'adjoint', function (n) {
  return this.map(MathLib.conjugate).transpose();
});