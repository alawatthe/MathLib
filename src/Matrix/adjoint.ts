/**
 * Calculates the adjoint matrix
 *
 * @return {Matrix}
 */
adjoint() : Matrix {
	return this.map(entry => MathLib.conjugate(entry)).transpose();
}