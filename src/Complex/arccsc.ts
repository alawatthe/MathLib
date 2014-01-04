/**
 * Returns the inverse cosecant of the number
 *
 * @return {Complex}
 */
arccsc() : Complex {

	// arccsc(0) = ComplexInfinity not ComplexNaN
	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return this.inverse().arcsin();
}