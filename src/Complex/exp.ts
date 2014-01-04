/**
 * Evaluates the exponential function with a complex argument
 *
 * @return {Complex}
 */
exp() : Complex {
	return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
}