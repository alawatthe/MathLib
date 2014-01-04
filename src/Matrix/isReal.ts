/**
 * Determines if the matrix has only real entries
 *
 * @return {boolean}
 */
isReal() : boolean {
	return this.every(MathLib.isReal);
}