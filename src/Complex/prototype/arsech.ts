/**
 * Returns the inverse hyperbolic secant of the number
 *
 * @return {Complex}
 */
arsech() : Complex {
	if (this.re === Infinity) {
		return new MathLib.Complex(NaN);
	}
	return this.inverse().arcosh();
}