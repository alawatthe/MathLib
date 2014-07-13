/**
 * Calculates the cotangent of a complex number
 *
 * @return {Complex}
 */
cot() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cos(aa) - MathLib.cosh(bb);

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(-MathLib.sin(aa) / d , MathLib.sinh(bb) / d);
}
