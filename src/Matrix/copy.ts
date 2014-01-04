/**
 * Copies the matrix
 *
 * @return {Matrix}
 */
copy() : Matrix {
	return this.map(MathLib.copy);
}