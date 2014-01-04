/**
 * Returns the inverse cotangent of the number.
 *
 * @return {Complex}
 */
arccot() : Complex {
	if (this.isZero()) {
		return new MathLib.Complex(MathLib.sign(1 / this.re) * Math.PI / 2, -this.im);
	}
	return this.inverse().arctan();
}