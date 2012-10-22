// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@returns {matrix}*
adjoint(n) {
  return this.map(MathLib.conjugate).transpose();
}