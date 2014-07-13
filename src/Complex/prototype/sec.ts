/**
 * Calculates the secant of a complex number
 *
 * @return {Complex}
 */
sec() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cos(2 * a) + MathLib.cosh(2 * b);

	return new MathLib.Complex(2 * MathLib.cos(a) * MathLib.cosh(b) / d , 2 * MathLib.sin(a) * MathLib.sinh(b) / d);
}
