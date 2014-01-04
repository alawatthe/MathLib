/**
 * Determines if the complex number is equal to 0.
 *
 * @return {boolean}
 */
isZero() : boolean {
	return MathLib.isZero(this.re) && MathLib.isZero(this.im);
}