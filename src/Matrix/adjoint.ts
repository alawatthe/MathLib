// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@return {Matrix}*
adjoint() : Matrix {
	return this.map(MathLib.conjugate).transpose();
}