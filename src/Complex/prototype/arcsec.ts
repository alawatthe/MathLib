/**
 * Returns the inverse secant of the number
 *
 * @return {Complex}
 */
arcsec() : Complex {

	// arcsec(0) = ComplexInfinity not ComplexNaN
	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return this.inverse().arccos();
}