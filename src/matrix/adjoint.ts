// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@returns {Matrix}*
adjoint() : Matrix {
	return this.map(MathLib.conjugate).transpose();
}