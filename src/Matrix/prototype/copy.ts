/**
 * Copies the matrix
 *
 * @return {Matrix}
 */
copy() : Matrix {
	return this.map(entry => MathLib.copy(entry));
}