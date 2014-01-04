/**
 * Calculates the negative of the complex number
 *
 * @return {Complex}
 */
negative() : Complex {
	return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
}