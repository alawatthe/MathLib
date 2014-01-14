/*
 * Evaluates the natural logarithm with complex arguments
 *
 * @return {Complex}
 */
ln() : Complex {
	if (this.re === Infinity) {
		return new MathLib.Complex(Infinity);
	}
	return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
}