// ### [Complex.prototype.times()](http://mathlib.de/en/docs/Complex/times)
// Multiplies complex numbers
//
// *@param {Complex|number|Rational}* The number to be multiplied  
// *@return {Complex}*
times(c) : Complex {
	if (c.type === 'complex') {
		if (this.re === Infinity) {
			if (c.isZero() || MathLib.isNaN(c.re)) {
				return new MathLib.Complex(NaN);
			}
			else {
				return new MathLib.Complex(Infinity);
			}
		}

		if (c.re === Infinity) {
			if (this.isZero() || MathLib.isNaN(this.re)) {
				return new MathLib.Complex(NaN);
			}
			else {
				return new MathLib.Complex(Infinity);
			}
		}

		return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)),
			MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re)));
	}
	else if (c.type === 'rational') {
		c = c.toNumber();
	}
	if (typeof c === 'number') {
		return new MathLib.Complex(MathLib.times(this.re, c), MathLib.times(this.im, c));
	}
}