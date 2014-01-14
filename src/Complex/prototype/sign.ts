/**
 * Calculates the signum of a complex number
 *
 * @return {Complex}
 */
sign() : Complex {
	if (this.isZero() || MathLib.isNaN(this.re)) {
		return this;
	}
	else if (this.re === Infinity) {
		return new MathLib.Complex(NaN);
	}
	return MathLib.Complex.polar(1, this.arg());
}