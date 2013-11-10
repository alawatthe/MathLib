// ### Complex.prototype.artanh()
// Returns the inverse hyperbolic tangent of the number
//
// *@return {Complex}*
artanh() : Complex {
	if (this.isZero()) {
		return new MathLib.Complex(this.re, this.im);
	}
	
	if (this.re === Infinity) {
		return new MathLib.Complex(NaN);
	}

	return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
}