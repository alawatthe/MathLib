/**
 * Returns the inverse hyperbolic tangent of the number
 *
 * @return {Complex}
 */
artanh() : Complex {
	var one = new MathLib.Complex(1, -0);

	if (this.isZero()) {
		return new MathLib.Complex(this.re, this.im);
	}

	if (this.re === Infinity) {
		return new MathLib.Complex(NaN);
	}

	return MathLib.times(0.5, MathLib.minus(one.plus(this).ln(), one.minus(this).ln()));
}
