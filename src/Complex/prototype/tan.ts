/**
 * Calculates the tangent of a complex number
 *
 * @return {Complex}
 */
tan() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cos(aa) + MathLib.cosh(bb);

	return new MathLib.Complex(MathLib.sin(aa) / d , MathLib.sinh(bb) / d);
}
