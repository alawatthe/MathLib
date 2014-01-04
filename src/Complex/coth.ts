/**
 * Calculates the hyperbolic cotangent of a complex number
 *
 * @return {Complex}
 */
coth() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cosh(aa) - MathLib.cos(bb);

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(MathLib.sinh(aa) / d , -MathLib.sin(bb) / d);
}