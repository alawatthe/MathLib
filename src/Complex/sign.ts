// ### Complex.prototype.sign()
// Calculates the signum of a complex number
//
// *@return {Complex}*
sign() : Complex {
	return MathLib.Complex.polar(1, this.arg());
}