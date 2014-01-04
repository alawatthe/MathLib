/**
 * Determines if the line is finite
 *
 * @return {boolean}
 */
isFinite() : boolean {
	return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
}