/**
 * Calculates the hyperbolic tangent of a complex number
 *
 * @return {Complex}
 */
tanh() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cosh(aa) + MathLib.cos(bb);

	return new MathLib.Complex(MathLib.sinh(aa) / d , MathLib.sin(bb) / d);
}
