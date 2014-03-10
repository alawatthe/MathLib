/**
 * Evaluates the entries of the matrix
 *
 * @return {Matrix}
 */
evaluate() : Matrix {
	return this.map(MathLib.evaluate);
}