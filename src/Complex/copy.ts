/**
 * Copies the complex number
 *
 * @return {Complex}
 */
copy() : Complex {
	return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
}