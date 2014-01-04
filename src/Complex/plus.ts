/**
 * Add complex numbers
 *
 * @param {number|Complex|Rational} summand The number to be added
 * @return {Complex}
 */
plus(summand) : Complex {
	if (summand.type === 'complex') {
		return new MathLib.Complex(MathLib.plus(this.re, summand.re), MathLib.plus(this.im, summand.im));
	}
	else if (summand.type === 'rational') {
		summand = summand.toNumber();
	}
	if (typeof summand === 'number') {
		return new MathLib.Complex(MathLib.plus(this.re, summand), this.im);
	}
}