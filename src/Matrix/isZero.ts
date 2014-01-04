/**
 * Determines if the matrix the zero matrix
 * The result is cached.
 *
 * @return {boolean}
 */
isZero() : boolean {
	var isZero = this.every(MathLib.isZero);

	this.isZero = function () {
		return isZero;
	};
	return isZero;
}