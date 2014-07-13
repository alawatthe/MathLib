/**
 * Calculates the hyperbolic secant of a complex number
 *
 * @return {Complex}
 */
sech() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cosh(2 * a) + MathLib.cos(2 * b);

	return new MathLib.Complex(2 * MathLib.cosh(a) * MathLib.cos(b) / d , -2 * MathLib.sinh(a) * MathLib.sin(b) / d);
}
