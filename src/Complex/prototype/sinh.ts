/**
 * Calculates the hyperbolic sine of a complex number
 *
 * @return {Complex}
 */
sinh() : Complex {
	return new MathLib.Complex(
		MathLib.cos(this.im) * MathLib.sinh(this.re),
		MathLib.sin(this.im) * MathLib.cosh(this.re)
	);
}