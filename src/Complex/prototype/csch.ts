/**
 * Calculates the hyperbolic cosecant of a complex number
 *
 * @return {Complex}
 */
csch() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cosh(2 * a) - MathLib.cos(2 * b);

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(2 * MathLib.sinh(a) * MathLib.cos(b) / d , -2 * MathLib.cosh(a) * MathLib.sin(b) / d);
}
