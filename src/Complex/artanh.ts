// ### Complex.prototype.artanh()
// Returns the inverse hyperbolic tangent of the number
//
// *@return {Complex}*
artanh() : Complex {
	return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
}