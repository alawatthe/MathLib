/**
 * Determines if the point is finite
 *
 * @return {boolean}
 */
isFinite() : boolean {
	return !MathLib.isZero(this[this.length - 1]);
}