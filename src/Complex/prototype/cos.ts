/**
 * Calculates the cosine of a complex number
 *
 * @return {Complex}
 */
cos() : Complex {
	return new MathLib.Complex(
		MathLib.cos(this.re) * MathLib.cosh(this.im),
		-MathLib.sin(this.re) * MathLib.sinh(this.im)
	);
}