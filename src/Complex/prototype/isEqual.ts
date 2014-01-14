/**
 * Determines if the complex number is equal to another number.
 *
 * @param {Integer|Rational|number|Complex} n The number to be compared  
 * @return {boolean}
 */
isEqual(n) : boolean {
	if (n.type !== 'complex') {
		if (MathLib.isZero(this.im)) {
			return MathLib.isEqual.apply(null, MathLib.coerce(this.re, n));
		}
		else {
			return false;
		}
	}
	else {
		return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
	}
}