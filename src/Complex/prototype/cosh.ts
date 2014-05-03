/*
 * Calculates the hyperbolic cosine of a complex number
 *
 * @return {Complex}
 */
cosh() : Complex {
	return new MathLib.Complex(
		MathLib.cos(this.im) * MathLib.cosh(this.re),
		MathLib.sin(this.im) * MathLib.sinh(this.re)
	);
}