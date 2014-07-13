/**
 * Returns the inverse hyperbolic cotangent of the number
 *
 * @return {Complex}
 */
arcoth() : Complex {
	var one = new MathLib.Complex(1, -0);

	if (MathLib.isZero(this.re)) {
		if (MathLib.isPosZero(this.im)) {
			return new MathLib.Complex(this.re, -1.5707963267948966192);
		}
		if (MathLib.isNegZero(this.im)) {
			return new MathLib.Complex(this.re, 1.5707963267948966192);
		}
	}

	if (this.re === Infinity) {
		return new MathLib.Complex(0, 0);
	}

	return MathLib.times(0.5, this.plus(one).divide(this.minus(one)).ln());
}
