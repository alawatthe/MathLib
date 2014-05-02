/**
 * Determines if the matrix is a upper triangular matrix
 *
 * @return {boolean}
 */
isUpper() : boolean {
	return this.slice(1).every(function (x, i) {
		return x.slice(0, i + 1).every(MathLib.isZero);
	});
}