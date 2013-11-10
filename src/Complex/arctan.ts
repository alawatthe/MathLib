// ### [Complex.prototype.arctan()](http://mathlib.de/en/docs/Complex/arctan)
// Returns the inverse tangent of the number
//
// *@return {Complex}*
arctan() : Complex {
	var res,
			iz = new MathLib.Complex(-this.im, this.re);

	if (this.isZero()) {
		return new MathLib.Complex(this.re, this.im);
	}
	
	res = MathLib.times(new MathLib.Complex(0, -0.5),
		MathLib.plus(1, iz).divide(MathLib.minus(1, iz)).ln());

	// Correct some values on the axis imaginary axis.
	// TODO: Are this all the wrong values?
	if (MathLib.isNegZero(this.re) && res.re !== Infinity && (this.im < 0 || this.im > 1)) {
		res.re = -res.re;
	}

	return res;
}