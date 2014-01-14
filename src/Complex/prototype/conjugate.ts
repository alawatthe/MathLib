/**
 * Calculates the conjugate of a complex number
 *
 * @return {Complex}
 */
conjugate() : Complex {
	return new MathLib.Complex(this.re, MathLib.negative(this.im));
}