/**
 * Determines if the complex number is equal to another number.
 *
 * @param {Complex|number|Rational} number The number to be compared  
 * @return {boolean}
 */
isEqual(number) : boolean {
	if (typeof number === 'number') {
		return MathLib.isEqual(this.re, number) && MathLib.isZero(this.im);
	}
	if (number.type === 'complex') {
		return MathLib.isEqual(this.re, number.re) && MathLib.isEqual(this.im, number.im);
	}
	return false;
}