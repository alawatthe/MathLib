/**
 * Multiplies complex numbers
 *
 * @param {Complex|number|Rational} factor The number to be multiplied  
 * @return {Complex}
 */
times(factor) : Complex {
	if (factor.type === 'complex') {
		if (this.re === Infinity) {
			if (factor.isZero() || MathLib.isNaN(factor.re)) {
				return new MathLib.Complex(NaN);
			}
			else {
				return new MathLib.Complex(Infinity);
			}
		}

		if (factor.re === Infinity) {
			if (this.isZero() || MathLib.isNaN(this.re)) {
				return new MathLib.Complex(NaN);
			}
			else {
				return new MathLib.Complex(Infinity);
			}
		}

		return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, factor.re), MathLib.times(this.im, factor.im)),
			MathLib.plus(MathLib.times(this.re, factor.im), MathLib.times(this.im, factor.re)));
	}
	else if (factor.type === 'rational') {
		factor = factor.coerceTo('number');
	}
	if (typeof factor === 'number') {
		return new MathLib.Complex(MathLib.times(this.re, factor), MathLib.times(this.im, factor));
	}
}