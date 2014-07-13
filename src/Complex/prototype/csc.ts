/**
 * Calculates the cosecant of a complex number
 *
 * @return {Complex}
 */
csc() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cos(2 * a) - MathLib.cosh(2 * b);

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(-2 * MathLib.sin(a) * MathLib.cosh(b) / d , 2 * MathLib.cos(a) * MathLib.sinh(b) / d);
}
