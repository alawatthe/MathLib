/**
 * Add complex numbers
 *
 * @param {Integer|Rational|number|Complex} summand The number to be added
 * @return {Complex}
 */
plus(summand) {
	if (summand.type !== 'complex') {
		return new MathLib.Complex(MathLib.plus.apply(null, MathLib.coerce(this.re, summand)), this.im);
	}
	else {
		return new MathLib.Complex(MathLib.plus(this.re, summand.re), MathLib.plus(this.im, summand.im));
	}
}