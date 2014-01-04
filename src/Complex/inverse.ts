/**
 * Calculates the inverse of a complex number
 *
 * @return {Complex}
 */
inverse() : Complex {
	var d = MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2));

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	if (this.re === Infinity) {
		return new MathLib.Complex(0);
	}

	return new MathLib.Complex(MathLib.divide(this.re, d), MathLib.divide(MathLib.negative(this.im), d));
}